from gradio_client import Client

client = Client("YashwanthSC/Sentina")
result = client.predict(
		api_name="/predict"
)
print(result)