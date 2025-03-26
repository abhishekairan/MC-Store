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
  const coupons = [
    { id: '001', name: 'Tasty',price: '$100', type: "%",code:"H3021UJ" },
    { id: '002', name: 'hurry',price: '$200',  type:"%", code:"22JJk8D"},
    { id: '003', name: 'game', price: '$300', type: "rs", code:"ABC090M" },
  ];

  const data = {
    head: ['ID', 'Name', 'Price', 'Type','Code', 'Actions'],
    body: coupons.map((coupon) => [coupon.id, coupon.name,coupon.price, coupon.type, coupon.code]),
    actions: true
  }

  return (
    <>
      <div className="h-16 border border-gray-600 flex items-center justify-between px-4 rounded-md">
        <button onClick={() => router.push('/dashboard/Coupon/new')} className="bg-blue-500 text-white px-4 py-2 rounded">Add coupon</button>
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

