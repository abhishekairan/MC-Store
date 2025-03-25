"use client";

import React from "react";
//import { Form, FormField } from '@/components/dashboard/Form_discount';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from "next/navigation";
import ListViewLayout from "@/components/dashboard/ListViewLayout";


const Page: React.FC = () => {
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 4);
  
  const router = useRouter();

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
  
  const listViewLayoutData = {
    name: 'Discount',
    addbtn: true,
    data: data
  }


  return (
    <>
      <ListViewLayout props={listViewLayoutData}></ListViewLayout>
      </>
  );
};

export default Page;

