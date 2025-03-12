"use client"

import React, { useState } from 'react';
import { SidebarContext,useSidebar } from '@/context/context'




const SidebarItem: React.FC<{ label: string; active: boolean }> = ({ label, active }) => {
  return (
    <button className={`m-5 flex flex-col justify-center items-center w-full h-10 cursor-pointer transition-all ${active ? 'text-blue-500 text-2xl' : 'text-xl hover:text-2xl duration-300'}`}>
      {label}
    </button>
  );
};

const Sidebar: React.FC = () => {
  const {sidebarItems} = useSidebar();

  return (
    
    <div className="flex h-full flex-wrap w-60 border-custom shadow-xl font-bold lg:bg-zinc-800/50 backdrop-blur-md gap-10 overflow-hidden content-center overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-700">
      {sidebarItems.map((item, index) => (
        <SidebarItem key={index} label={item.label} active={item.active} />
      ))}
    </div>
    
  );
};


export { Sidebar, SidebarItem };