import json

import gradio as gr
import pandas as pd
import requests
from statsmodels.tsa.holtwinters import ExponentialSmoothing

API_URL = "https://in-telli-ventory.onrender.com/api/sales"

# Cache to avoid fetching the same data multiple times
cache = {
    "data": None,
    "timestamp": None
}

def fetch_data():
    global cache
    if cache['data'] and (pd.Timestamp.now() - cache['timestamp']).seconds < 3600:  # Cache valid for 1 hour
        return cache['data']
    
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        data = response.json()
        cache['data'] = data
        cache['timestamp'] = pd.Timestamp.now()
        return data
    except requests.RequestException:
        return None

def preprocess_data(data):
    df = pd.DataFrame(data)
    df['saleDate'] = pd.to_datetime(df['saleDate'])
    df['productName'] = df.apply(lambda row: row['product']['productName'], axis=1)
    df['quantity'] = pd.to_numeric(df['quantity'])
    df = df.groupby(['productName', 'saleDate'])['quantity'].sum().reset_index()
    df = df.set_index('saleDate').sort_index()
    return df

def forecast_demand(days):
    data = fetch_data()
    if not data:
        return {"error": "Failed to fetch data from API"}
    
    df = preprocess_data(data)
    forecast_results = []
    
    for product in df['productName'].unique():
        product_df = df[df['productName'] == product]['quantity']
        if len(product_df) < 2:
            continue
        
        try:
            model = ExponentialSmoothing(product_df, trend='add', seasonal='add', seasonal_periods=7)
            fitted_model = model.fit()
            forecast = fitted_model.forecast(days)
            
            forecast_mean = int(forecast.sum().round())
            forecast_lower = int((forecast * 0.8).sum().round())
            forecast_upper = int((forecast * 1.2).sum().round())
            
            forecast_results.append({
                "product_name": product,
                "predicted_quantity": forecast_mean,
                "minimum_demand": forecast_lower,
                "maximum_demand": forecast_upper
            })
        except Exception:
            continue
    
    if not forecast_results:
        return [{"error": "No forecast results available."}]
    
    return forecast_results

def gradio_interface(days):
    try:
        days = int(days)
        if days <= 0:
            return json.dumps([{"error": "Please enter a positive number of days."}])
        
        forecast_result = forecast_demand(days)
        return json.dumps(forecast_result, indent=2)
    except ValueError:
        return json.dumps([{"error": "Please enter a valid number of days."}])
    except Exception:
        return json.dumps([{"error": "An error occurred."}])

iface = gr.Interface(
    fn=gradio_interface,
    inputs=gr.Number(label="Number of days to forecast", precision=0),
    outputs=gr.JSON(label="Forecasted Demand"),
    title="Demand Forecasting",
    description="Enter the number of days to forecast demand based on historical sales data."
)

if __name__ == "__main__":
    iface.launch()