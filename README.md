
# Intelligent Inventory Management - StockSync


This project provides a solution for **Demand Forecasting**, **Sentiment Analysis**, and **Fraud Detection** using the Gradio API clients. By connecting your inventory data, you can make informed decisions that improve efficiency and predict future outcomes. 

## Features

1. **Demand Forecasting**: Predict future demand based on historical data to optimize inventory levels.
2. **Sentiment Analysis**: Analyze customer reviews and feedback to understand the sentiment towards products and services.
3. **Fraud Detection**: Detect and prevent fraudulent activities in transactions, ensuring the safety of your business.

---

## Installation

To use the functionalities provided by this project, you'll need to have Python installed. Then, install the necessary libraries:

```bash
pip install gradio_client
```
# Demand Forecasting usage:
```
from gradio_client import Client

client = Client("YashwanthSC/Demanda")
result = client.predict(
		days=3,
		api_name="/predict"
)
print(result)
```

# Sentiment Analysis:

```
from gradio_client import Client

client = Client("YashwanthSC/Sentina")
result = client.predict(
		days=3,
		api_name="/predict"
)
print(result)
```

# Fraud Detection:

```
from gradio_client import Client

client = Client("YashwanthSC/Freda")
result = client.predict(
		days=3,
		api_name="/predict"
)
print(result)
```



