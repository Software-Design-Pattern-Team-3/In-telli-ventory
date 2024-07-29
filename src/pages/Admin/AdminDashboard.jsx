import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const inventoryItems = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    stock: 10,
    price: '$100',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    stock: 5,
    price: '$200',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for Product 3',
    stock: 20,
    price: '$150',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description for Product 4',
    stock: 8,
    price: '$250',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Description for Product 5',
    stock: 15,
    price: '$180',
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Description for Product 6',
    stock: 12,
    price: '$220',
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Inventory Management</h1>
      <div className="mb-8 text-center">
        <p className="mt-2 text-lg">
          Welcome to the Inventory Management section of the Admin Dashboard. Here, you can oversee all the products in your inventory, manage stock levels, and update product details. Each product card displays key information, such as the product name, description, stock quantity, and price. Use the Edit button on each card to make any necessary changes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryItems.map(item => (
          <Card key={item.id} className="transform hover:-translate-y-2 transition-transform duration-300">
            <CardHeader className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-600 opacity-50 rounded-lg"></div>
              <CardTitle className="relative text-2xl font-bold">{item.name}</CardTitle>
              <CardDescription className="relative text-lg">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="relative text-md"><strong>Stock:</strong> {item.stock}</p>
              <p className="relative text-md"><strong>Price:</strong> {item.price}</p>
              <Button className="relative mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <style jsx>{`
        .card {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .card-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
          opacity: 0.5;
          pointer-events: none;
        }
        .card-title, .card-description {
          z-index: 1;
        }
        .card-title {
          margin-bottom: 0.5rem;
        }
        .card-content {
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
