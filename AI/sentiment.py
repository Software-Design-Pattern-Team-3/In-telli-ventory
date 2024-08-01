import random
from datetime import datetime, timedelta
import threading
from queue import Queue
import signal
import sys

# Define your API endpoint
api_endpoint = 'https://in-telli-ventory.onrender.com/api/sales'  # Replace with your API endpoint

# List of user and product IDs
user_ids = [7, 18, 19, 21, 23, 24, 27]  # Add more as needed
product_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]  # Add more as needed

# Function to generate a random sale entry
def generate_sale_entry(sale_id, product_ids, user_ids, start_date, end_date):
    product_id = random.choice(product_ids)
    user_id = random.choice(user_ids)
    quantity = random.randint(1, 5)  # Random quantity between 1 and 5
    total_price = round(random.uniform(50, 1000), 2)  # Random price between $50 and $1000
    sale_date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    return {
        "saleId": sale_id,
        "quantity": quantity,
        "saleDate": sale_date.strftime('%Y-%m-%d'),  # Format date for SQL
        "totalPrice": total_price,
        "productId": product_id,
        "userId": user_id
    }

# Worker function for threading
def worker(queue, output_list):
    while not queue.empty():
        sale_entry = queue.get()
        output_list.append(sale_entry)
        queue.task_done()

# Function to handle termination
def signal_handler(sig, frame):
    print('\nInterrupt received, stopping...')
    sys.exit(0)

# Register signal handler for Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

# Generate and post data for each product
def generate_and_post_data(api_endpoint, user_ids, product_ids):
    start_date = datetime(2024, 7, 1)  # Start date for the data
    end_date = start_date + timedelta(days=30)  # End date (one month later)
    
    sale_id = 1
    queue = Queue()
    output_list = []

    for product_id in product_ids:
        for _ in range(30):  # Generate 30 sales entries for each product
            sale_entry = generate_sale_entry(sale_id, product_ids, user_ids, start_date, end_date)
            queue.put(sale_entry)
            sale_id += 1

    num_threads = 10  # Number of threads to use
    threads = []
    
    for _ in range(num_threads):
        thread = threading.Thread(target=worker, args=(queue, output_list))
        thread.start()
        threads.append(thread)
    
    queue.join()  # Wait for all tasks to be done
    
    for thread in threads:
        thread.join()  # Ensure all threads have finished

    return output_list

# Print SQL insert statements
def print_sql_inserts(sales_data):
    print("INSERT INTO sale (sale_id, product_id, quantity, sale_date, user_id, total_price) VALUES")
    values = []
    for entry in sales_data:
        values.append(f"({entry['saleId']}, {entry['productId']}, {entry['quantity']}, '{entry['saleDate']}', {entry['userId']}, {entry['totalPrice']})")
    print(",\n".join(values) + ";")

# Generate data and print SQL statements
sales_data = generate_and_post_data(api_endpoint, user_ids, product_ids)
print_sql_inserts(sales_data)
