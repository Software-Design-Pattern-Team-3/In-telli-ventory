from functools import lru_cache

import gradio as gr
import pandas as pd
import requests


# Function to fetch data from API with caching
@lru_cache(maxsize=10)
def fetch_data(api_url):
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}")


# Function to detect fraudulent data
def detect_fraud(data):
    # Flatten the JSON structure to create a DataFrame
    flattened_data = []
    for sale in data:
        flattened_data.append(
            {
                "saleId": sale["saleId"],
                "productName": sale["product"]["productName"],
                "quantity": sale["quantity"],
                "saleDate": sale["saleDate"],
                "userId": sale["user"]["id"],
                "totalPrice": sale["totalPrice"],
            }
        )

    df = pd.DataFrame(flattened_data)
    df["saleDate"] = pd.to_datetime(df["saleDate"])

    # Define criteria for fraud detection
    fraud_criteria = {
        "large_quantity": df["quantity"] > 50,
        "high_frequency": df.groupby("userId")["saleId"].transform("count") > 5,
        "high_value": df["totalPrice"] > 10000,
        "odd_hours": ~df["saleDate"].dt.hour.between(6, 21),
    }

    # Apply criteria to find fraudulent transactions
    df["is_fraud_large_quantity"] = fraud_criteria["large_quantity"]
    df["is_fraud_high_frequency"] = df["userId"].map(fraud_criteria["high_frequency"])
    df["is_fraud_high_value"] = fraud_criteria["high_value"]
    df["is_fraud_odd_hours"] = fraud_criteria["odd_hours"]

    # Calculate the percentage of fraudulent transactions per product
    fraud_summary = (
        df.groupby("productName")
        .agg(
            {
                "is_fraud_large_quantity": "mean",
                "is_fraud_high_frequency": "mean",
                "is_fraud_high_value": "mean",
                "is_fraud_odd_hours": "mean",
            }
        )
        .reset_index()
    )

    fraud_summary["fraud_percent"] = (
        fraud_summary[
            [
                "is_fraud_large_quantity",
                "is_fraud_high_frequency",
                "is_fraud_high_value",
                "is_fraud_odd_hours",
            ]
        ].mean(axis=1)
        * 100
    )

    # Filter products with high percentage of fraud
    high_fraud_products = fraud_summary[fraud_summary["fraud_percent"] > 50]

    return high_fraud_products


# Gradio interface function
def analyze(api_url):
    data = fetch_data(api_url)
    high_fraud_products = detect_fraud(data)
    return high_fraud_products.to_json(orient="records")


# Gradio interface
iface = gr.Interface(
    fn=analyze,
    inputs=gr.Textbox(label="API Link"),
    outputs=gr.JSON(label="High Fraudulent Products"),
    title="Fraud Detection",
    description="Fetch data from API and detect products with high percentage of fraudulent transactions.",
)

if __name__ == "__main__":
    iface.launch()
