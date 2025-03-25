"use client";

import React, { useState, ChangeEvent } from "react";
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useRouter } from "next/navigation";
import ListViewLayout from "@/components/dashboard/ListViewLayout";


const Page: React.FC = () => {
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 2);

  const router = useRouter();

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

  const listViewLayoutData = {
    name: 'Category',
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