"use client"
import React, { useState, ChangeEvent } from "react";

import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
}

const Page =() => {
  
 
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 0);

  const [formData, setFormData] = useState<FormData>({
    name: "Default Name",
    email: "default@gmail.com",
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
    });
    setIsDirty(false);
  };

  // if (slug) {
  //   router.push(slug);
  //   return <div>Redirecting...</div>;
  // }

  return (
    <div>
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
    <br/><br/><br/>
    <div className="border-x-2  align-bottom border-y-4 border-black flex-row w-70 h-40 pr-20 mt-10 "> 
  <div id="personal-information"className="card-wrapper">
   <div className="split-card split-card__primart ds-grid__col-47 ds-grid--wide__col-35 pb-2" >
     <div className="ds-field personal-information-card__userField personal-information-card__emailAddress ds-field--non-empty ds-field--error">
     <h1 className='ml-5 mt-5'>voting sites</h1></div>
     
   </div>
  </div>
 </div>
 
    
    </div>

    
  );
};

export default Page;





