"use client";

import React, { useState, ChangeEvent } from "react";
import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
interface FormData {
  name: string;
  email: string;
  id: string;
}

const Page: React.FC = () => {
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 2);

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
  const Categories = [
    { id: '001', name: 'Category 1', description: '---', quantity: 100 },
    { id: '002', name: 'Category 2', description: '---', quantity: 200 },
    { id: '003', name: 'Category 3', description: '---', quantity: 300 },
  ];

  const data = {
    head: ['ID', 'Name', 'Description', 'Quantity', 'Actions'],
    body: Categories.map((Category) => [Category.id, Category.name, Category.description, Category.quantity]),
    actions: true
  };

  return (
    <>
      <div className="h-16 border border-gray-600 flex items-center justify-between px-4 rounded-md">
        <button onClick={() => router.push('/dashboard/Category/new')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Category</button>
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