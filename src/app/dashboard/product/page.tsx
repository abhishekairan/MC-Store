"use client";

import React, { useState, ChangeEvent } from "react";
import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  id:string;
}

const Page =() => {
  
 
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 0);

  const [formData, setFormData] = useState<FormData>({
    name: "Default Name",
    email: "default@gmail.com",
    id:"000"
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
      id:"000"
    });
    setIsDirty(false);
  };

  // if (slug) {
  //   router.push(slug);
  //   return <div>Redirecting...</div>;
  // }

  return (
  
    <Form handleChange={handleChange} handleSave={handleSave} handleDiscard={handleDiscard}>
     <FormField
        label="Name"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <FormField
        label="Email"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormField
        label="Product_id"
        type="id"
        id="ID"
        name="ID"
        value={formData.id}
        onChange={handleChange}
      />
    </Form>
  );
};

export default Page;





