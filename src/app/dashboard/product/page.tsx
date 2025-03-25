"use client";

import React, { useState, ChangeEvent } from "react";
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from "next/navigation";
import ListViewLayout from "@/components/dashboard/ListViewLayout";

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

  const data = {
    head: ['ID', 'Name', 'Price', 'Quantity', 'Actions'],
    body: products.map((product) => [product.id, product.name, product.price, product.quantity]),
    actions: true
  }

  const ListViewLayoutdata = {
    data: data,
    name: "Product",
    addbtn: true
  }

  return (
    <ListViewLayout props={ListViewLayoutdata}></ListViewLayout>
  );
};

export default Page;