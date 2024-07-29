import { useUser } from "@/global/useUser";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconMoon,
  IconSettings,
  IconSun,
  IconUserBolt,
} from "@tabler/icons-react";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Links, Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
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

import { IconEdit, IconTrash } from '@tabler/icons-react';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface EditModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState<User>({ id: 0, firstname: '', lastname: '', email: '' });

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedUser);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              name="firstname"
              value={editedUser.firstname}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={editedUser.lastname}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSave = async (updatedUser: User) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map(user => user.id === updatedUser.id ? response.data : user));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="overflow-auto hide-scrollbar h-full">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">First Name</th>
            <th className="py-3 px-4 border-b">Last Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{user.id}</td>
              <td className="py-3 px-4 border-b">{user.firstname}</td>
              <td className="py-3 px-4 border-b">{user.lastname}</td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">
                <button
                  onClick={() => handleEdit(user)}
                  className="mr-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <IconEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <IconTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <EditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_REACT_APP_API_URL}/products`, setProducts);
  }, []);

  return (
    <div className="overflow-auto hide-scrollbar h-screen">
      <table className="min-w-full h-screen bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Product Name</th>
            <th className="py-3 px-4 border-b">Category</th>
            <th className="py-3 px-4 border-b">Subcategory</th>
            <th className="py-3 px-4 border-b">Brand</th>
            <th className="py-3 px-4 border-b">Sale Price</th>
            <th className="py-3 px-4 border-b">Market Price</th>
            <th className="py-3 px-4 border-b">Type</th>
            <th className="py-3 px-4 border-b">Rating</th>
            <th className="py-3 px-4 border-b">Purchases</th>
            <th className="py-3 px-4 border-b">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{product.id}</td>
              <td className="py-3 px-4 border-b">{product.productname}</td>
              <td className="py-3 px-4 border-b">{product.category}</td>
              <td className="py-3 px-4 border-b">{product.subcategory}</td>
              <td className="py-3 px-4 border-b">{product.brand}</td>
              <td className="py-3 px-4 border-b">{product.saleprice}</td>
              <td className="py-3 px-4 border-b">{product.marketprice}</td>
              <td className="py-3 px-4 border-b">{product.type}</td>
              <td className="py-3 px-4 border-b">{product.rating}</td>
              <td className="py-3 px-4 border-b">{product.purchases}</td>
              <td className="py-3 px-4 border-b">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Admin: React.FC = () => {
  const tabs: { title: string; value: string; content: JSX.Element }[] = [
    {
      title: "Users",
      value: "users",
      content: (
        <div className="w-full h-full rounded-2xl p-6 text-lg text-black bg-white shadow-md flex flex-col">
          <p className="mb-4 font-semibold text-gray-700">Users</p>
          <div className="flex-grow overflow-hidden">
            <UserTable />
          </div>
        </div>
      ),
    },
    {
      title: "Products",
      value: "products",
      content: (
        <div className="w-full h-full rounded-2xl p-6 text-lg text-black bg-white shadow-md flex flex-col">
          <p className="mb-4 font-semibold text-gray-700">Products</p>
          <div className="flex-grow overflow-hidden">
            <ProductTable />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[calc(100vh-100px)] overflow-hidden md:h-[calc(100vh-100px)] relative flex flex-col mx-auto w-11/12 items-start justify-start my-5">
      <Tabs tabs={tabs} />
    </div>
  );
};


interface Card {
  description: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  content: string | (() => React.ReactNode);
}

export default function AdminDash() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const applyTheme = (theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  };

  const [theme, setTheme] = useState(() => {
    // Get the theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    // Apply the theme immediately
    applyTheme(savedTheme);
    return savedTheme;
  });

  useEffect(() => {
    // This effect now only handles saving the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      // Apply the new theme immediately
      applyTheme(newTheme);
      return newTheme;
    });
  };
  const links: Links[] = [
    {
      label: theme === "light" ? "Dark Mode" : "Light Mode",
      icon: theme === "light" ? <IconMoon className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> : <IconSun className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
      onClick: toggleTheme,
      type: 'button',
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      type: 'link',
    },
    {
      label: "Profile",
      href: "/admin",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      type: 'link',
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      type: 'link',
    },
    {
      label: "Logout",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: (e: any) => {
        e.preventDefault();
        logout();
        navigate("/auth/login");
      },
      type: 'button',
    },
  ];

  const [open, setOpen] = useState<boolean>(false);

  const getAvatar = () => {
    if (user.picture === "none") {
      return (
        <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-500 text-white flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <img
          src={user.picture}
          className="h-7 w-7 flex-shrink-0 rounded-full"
          width={50}
          height={50}
          alt="Avatar"
        />
      );
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user.name,
                href: "#",
                icon: getAvatar(),
                type: 'link',
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Admin/>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        StockSync
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};