"use client";

import React, { useState, ChangeEvent } from "react";
import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";


interface FormData {
  name: string;
  email: string;
}

const Page: React.FC = () => {

  const sidebarContext = useSidebar()
  console.log(sidebarContext)
  const newSidebarContext = sidebarContext.sidebarItems
  newSidebarContext[0].active = false
  sidebarContext.setSidebarItems(newSidebarContext)
  console.log(sidebarContext)

  const [formData, setFormData] = useState<FormData>({
    name: "Default Name",
    email: "default@example.com",
  });
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    });
    setIsDirty(false);
  };

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
  </Form>
  );
};

export default Page;




