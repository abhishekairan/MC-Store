"use client";

import React, { useState, ChangeEvent } from "react";
//import { Form, FormField } from '@/components/dashboard/Form_discount';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from "next/navigation";
import Table from "@/components/Table_discount";

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
    { id: '001', name: 'ranks', price: '$100', discount: "10%" },
    { id: '002', name: 'bundles', price: '$200', discount:"20%" },
    { id: '003', name: 'keys', price: '$400', discount: "30%" },
  ];

  const data = {
    head: ['ID', 'Name', 'Price', 'Discount', 'Actions'],
    body: products.map((product) => [product.id, product.name, product.price, product.discount]),
    actions: true
  }

  return (
    <>
      <div className="h-16 border border-gray-600 flex items-center justify-between px-4 rounded-md">
        <button onClick={() => router.push('/dashboard/Discount/new')} className="bg-blue-500 text-white px-4 py-2 rounded">Add discount</button>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-600"
        />
      </div>
      <Table props={data} />
    </>
  );
};

export default Page;

