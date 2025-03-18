"use client";

import React from 'react';
import { redirect } from 'next/navigation'
import { useSidebar } from '@/context/context';

const SidebarItem: React.FC<{ label: string; active: boolean; href: string }> = ({ label, active, href }) => {

  const handleClick = () => {
    redirect(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`m-5 flex flex-col justify-center items-center w-full h-6 cursor-pointer transition-all ${active ? 'text-blue-500 text-2xl' : 'text-xl hover:text-2xl duration-300'}`}
    >
      {label}
    </button>
  );
};

const Sidebar: React.FC = () => {
  const { sidebarItems } = useSidebar();

  return (
    <div className="flex h-full flex-wrap content-start w-60 border-custom-no-border shadow-xl font-bold lg:bg-zinc-800/50 backdrop-blur-md gap-10 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-700 pt-10">
      {sidebarItems.map((item, index) => (
        <SidebarItem key={index} label={item.label} active={item.active} href={item.href} />
      ))}
    </div>
  );
};

export { Sidebar, SidebarItem };