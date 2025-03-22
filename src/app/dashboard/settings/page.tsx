"use client";

import Image from 'next/image';
import { useState, ChangeEvent } from "react";
import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
}
const page = () => {

  
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


  return (
  <div>
    <div className="border-x-2  border-y-4 border-black flex-row w-70 h-60 pr-20 mt-10 "> 
     <div id="personal-information"className="card-wrapper">
      <div className="split-card split-card__primart ds-grid__col-47 ds-grid--wide__col-35" >
        <div className="ds-field personal-information-card__userField personal-information-card__emailAddress ds-field--non-empty ds-field--error">
        <h1 className='ml-5 mt-5'>personal information</h1></div>
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
      </div>
     </div>
    </div>
    

  <div className="border-x-2  border-y-4 border-black flex-row w-70 h-40 pr-20 mt-10 "> 
     <div id="personal-information"className="card-wrapper">
      <div className="split-card split-card__primart ds-grid__col-47 ds-grid--wide__col-35" >
        <div className="ds-field personal-information-card__userField personal-information-card__emailAddress ds-field--non-empty ds-field--error">
        <h1 className='ml-5 mt-5'>support</h1></div>
      </div>
     </div>
    </div>

    
    <div className="border-x-2  border-y-4 border-black flex-row w-70 h-40 pr-20 mt-10 "> 
     <div id="personal-information"className="card-wrapper">
      <div className="split-card split-card__primart ds-grid__col-47 ds-grid--wide__col-35" >
        <div className="ds-field personal-information-card__userField personal-information-card__emailAddress ds-field--non-empty ds-field--error">
        <h1 className='ml-5 mt-5'>Ptero API</h1></div>
      </div>
     </div>
    </div> 

     </div> 


  //   <div class="image-container">
  //   <img src="/images/freepik__retouch__37930-removebg-preview.png" alt="Image" >
  //   <div class="card-container">
  //     <div class="card" id="card-1">
  //       <h2>Card 1</h2>
  //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //     </div>
  //     <div class="card" id="card-2">
  //       <h2>Card 2</h2>
  //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //     </div>
  //     <div class="card" id="card-3">
  //       <h2>Card 3</h2>
  //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //     </div>
  //   </div>
    
  // </div>
  

    
  );
}

export default page