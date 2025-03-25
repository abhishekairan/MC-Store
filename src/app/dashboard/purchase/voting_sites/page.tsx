"use client"

import { useUpdateSidebarItems } from '@/components/dashboard/MainLayout';
import { useSidebar } from '@/context/context';
import React from 'react'

const page = () => {
  
    
  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 1);
  

  return (
    <div>voting </div>
  )
}

export default page

