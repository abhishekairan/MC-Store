"use client";

import React, { useState, ChangeEvent } from "react";
import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  id: string;
}

const Page: React.FC = () => {
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 1);

  
  const router = useRouter();


  const [formData, setFormData] = useState<FormData>({
    name: "Default Name",
    email: "default@gmail.com",
    id: "000"
  });
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    console.log('Data saved:', formData);
    setIsDirty(false);
  };

  const handleDiscard = () => {
    setFormData({
      name: "Default Name",
      email: "default@example.com",
      id: "000"
    });
    setIsDirty(false);
  };

  // Sample product list
  const products = [
    { id: '001', name: 'Product 1', price: '$10', quantity: 100 },
    { id: '002', name: 'Product 2', price: '$20', quantity: 200 },
    { id: '003', name: 'Product 3', price: '$30', quantity: 300 },
  ];

  return (
    <>
      <div className="h-16 border border-gray-600 flex items-center justify-between px-4 rounded-md">
        <button onClick={() => router.push('/dashboard/product/new')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-600"
        />
      </div>
      <div className="flex flex-col mt-5">
        <table className="mx-auto w-full text-left gap-6 border-separate border-spacing-y-5">
          <thead>
            <tr className="text-2xl">
              <th className=" border-gray-600 border-y border-l p-2">Product ID</th>
              <th className="border-gray-600 border-y p-2">Product Name</th>
              <th className="border-gray-600 border-y p-2">Price</th>
              <th className="border-gray-600 border-y p-2">Quantity</th>
              <th className="border-gray-600 border-y border-r p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="text-gray-300 border-y border-l border-gray-600 p-2">{product.id}</td>
                <td className="text-gray-300 border-y border-gray-600 p-2">{product.name}</td>
                <td className="text-gray-300 border-y border-gray-600 p-2">{product.price}</td>
                <td className="text-gray-300 border-y border-gray-600 p-2">{product.quantity}</td>
                <td className="border-y border-r border-gray-600 p-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;