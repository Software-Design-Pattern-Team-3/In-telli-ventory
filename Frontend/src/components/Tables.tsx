import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs } from "./ui/tabs";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface Product {
  id: number;
  productname: string;
  category: string;
  subcategory: string;
  brand: string;
  saleprice: number;
  marketprice: number;
  type: string;
  rating: number;
  purchases: number;
  stock: number;
}

const fetchData = async (url: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_REACT_APP_API_URL}/users`, setUsers);
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">First Name</th>
          <th className="py-2 px-4 border-b">Last Name</th>
          <th className="py-2 px-4 border-b">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="py-2 px-4 border-b">{user.id}</td>
            <td className="py-2 px-4 border-b">{user.firstname}</td>
            <td className="py-2 px-4 border-b">{user.lastname}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_REACT_APP_API_URL}/products`, setProducts);
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Product Name</th>
          <th className="py-2 px-4 border-b">Category</th>
          <th className="py-2 px-4 border-b">Subcategory</th>
          <th className="py-2 px-4 border-b">Brand</th>
          <th className="py-2 px-4 border-b">Sale Price</th>
          <th className="py-2 px-4 border-b">Market Price</th>
          <th className="py-2 px-4 border-b">Type</th>
          <th className="py-2 px-4 border-b">Rating</th>
          <th className="py-2 px-4 border-b">Purchases</th>
          <th className="py-2 px-4 border-b">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td className="py-2 px-4 border-b">{product.id}</td>
            <td className="py-2 px-4 border-b">{product.productname}</td>
            <td className="py-2 px-4 border-b">{product.category}</td>
            <td className="py-2 px-4 border-b">{product.subcategory}</td>
            <td className="py-2 px-4 border-b">{product.brand}</td>
            <td className="py-2 px-4 border-b">{product.saleprice}</td>
            <td className="py-2 px-4 border-b">{product.marketprice}</td>
            <td className="py-2 px-4 border-b">{product.type}</td>
            <td className="py-2 px-4 border-b">{product.rating}</td>
            <td className="py-2 px-4 border-b">{product.purchases}</td>
            <td className="py-2 px-4 border-b">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Admin: React.FC = () => {
  const tabs: { title: string; value: string; content: JSX.Element }[] = [
    {
      title: "Users",
      value: "users",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-2xl font-bold text-black bg-gradient-to-br from-gray-100 to-gray-300">
          <p className="mb-4">Users</p>
          <UserTable />
        </div>
      ),
    },
    {
      title: "Products",
      value: "products",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-2xl font-bold text-black bg-gradient-to-br from-gray-100 to-gray-300">
          <p className="mb-4">Products</p>
          <ProductTable />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[30rem] md:h-[50rem] perspective-[1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-20">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Admin;
