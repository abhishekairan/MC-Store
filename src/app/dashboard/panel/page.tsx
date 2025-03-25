"use client";

import React, { useState, ChangeEvent } from "react";
import { Form, FormField } from '@/components/dashboard/Form';
import { useSidebar } from "@/context/context";
import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import Table from "@/components/Table";
interface FormData {
  name: string;
  email: string;
  id: string;
}

const Page: React.FC = () => {
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 3);

  // Sample Server list
  const server = [
    { id: '001', name: 'Server 1', ip: 'play.clubcolony.in', uuid: '0000-0000-0000-0000' },
  ];

  const data = {
    head: ['ID', 'Name', 'IP', 'UUID'],
    body: server.map((server) => [server.id, server.name, server.ip, server.uuid]),
    actions: false
  };

  return (
    <>
      <div className="h-16 border border-gray-600 flex flex-row-reverse items-center justify-between px-4 rounded-md">
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