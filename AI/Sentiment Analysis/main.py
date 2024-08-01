import asyncio
from concurrent.futures import ProcessPoolExecutor
from functools import partial

import aiohttp
import gradio as gr
import ujson
from cachetools import TTLCache
from textblob import TextBlob

# Initialize caches
REVIEWS_CACHE = TTLCache(maxsize=1, ttl=300)  # 5 minutes TTL
SENTIMENT_CACHE = TTLCache(maxsize=10000, ttl=3600)  # 1 hour TTL

# Create a process pool for CPU-bound tasks
process_pool = ProcessPoolExecutor()

def analyze_sentiment_batch(texts):
    return [TextBlob(text).sentiment.polarity for text in texts]

async def fetch_reviews(session):
    if REVIEWS_CACHE.get('reviews'):
        return REVIEWS_CACHE['reviews']
    
    async with session.get('https://in-telli-ventory.onrender.com/api/reviews') as response:
        response.raise_for_status()
        reviews = await response.json(loads=ujson.loads)
        REVIEWS_CACHE['reviews'] = reviews
        return reviews

async def process_reviews(reviews):
    review_texts = [review["reviewText"] for review in reviews]
    batch_size = 1000
    sentiments = []

    for i in range(0, len(review_texts), batch_size):
        batch = review_texts[i:i+batch_size]
        batch_sentiments = await asyncio.get_event_loop().run_in_executor(
            process_pool, 
            partial(analyze_sentiment_batch, batch)
        )
        sentiments.extend(batch_sentiments)

    return sentiments

async def sentiment_analysis():
    async with aiohttp.ClientSession() as session:
        reviews = await fetch_reviews(session)
        
    if not reviews:
        return {
            "total_reviews": 0,
            "negative_percentage": 0,
            "positive_percentage": 0,
            "neutral_percentage": 0,
            "products_by_category": {"negative": [], "positive": [], "neutral": []}
        }

    sentiment_scores = await process_reviews(reviews)
    
    total_reviews = len(reviews)
    positive_products = set()
    negative_products = set()
    neutral_products = set()
    
    positive_count = 0
    negative_count = 0
    neutral_count = 0
    
    for review, sentiment_score in zip(reviews, sentiment_scores):
        product_name = review["product"]["productName"]
        if sentiment_score >= 0.1:
            positive_count += 1
            positive_products.add(product_name)
        elif sentiment_score <= -0.1:
            negative_count += 1
            negative_products.add(product_name)
        else:
            neutral_count += 1
            neutral_products.add(product_name)
    
    positive_percentage = positive_count / total_reviews * 100
    negative_percentage = negative_count / total_reviews * 100
    neutral_percentage = neutral_count / total_reviews * 100
    
    return {
        "total_reviews": total_reviews,
        "negative_percentage": round(negative_percentage, 1),
        "positive_percentage": round(positive_percentage, 1),
        "neutral_percentage": round(neutral_percentage, 1),
        "products_by_category": {
            "negative": list(negative_products),
            "positive": list(positive_products),
            "neutral": list(neutral_products)
        }
    }

def gradio_interface():
    with gr.Blocks() as demo:
        gr.Markdown("# Sentiment Analysis Dashboard")
        sentiment_button = gr.Button("Analyze Sentiment")
        output = gr.JSON()
        sentiment_button.click(lambda: asyncio.run(sentiment_analysis()), outputs=output)
    return demo

if __name__ == "__main__":
    app = gradio_interface()
    app.launch(share=True)