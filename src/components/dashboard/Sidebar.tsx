"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem: React.FC<{ label: string; active: boolean; href: string }> = ({ label, active, href }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href); // Navigate to the href
  };

  return (
    <button
      onClick={handleClick}
      className={`m-5 flex flex-col justify-center items-center w-full h-6 cursor-pointer transition-all ${
        active ? "text-blue-500 text-2xl" : "text-xl hover:text-2xl duration-300"
      }`}
    >
      {label}
    </button>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current URL path

  const [sidebarItems, setSidebarItems] = useState([
    { label: "Purchase", active: false, href: "/dashboard/purchase" },
    { label: "Product", active: false, href: "/dashboard/product" },
    { label: "Category", active: false, href: "/dashboard/category" },
    { label: "Panel", active: false, href: "/dashboard/panel" },
    { label: "Discount", active: false, href: "/dashboard/discount" },
    { label: "Coupon", active: false, href: "/dashboard/coupon" },
    { label: "Settings", active: false, href: "/dashboard/settings" },
  ]);

  useEffect(() => {
    // Update the active status of sidebar items based on the current URL
    const updatedSidebarItems = sidebarItems.map((item) => ({
      ...item,
      active: pathname.startsWith(item.href), // Mark as active if the current path starts with the item's href
    }));
    setSidebarItems(updatedSidebarItems);
  }, [pathname]);

  return (
    <div className="flex h-full flex-wrap content-start lg:w-48 border-custom-no-border shadow-xl font-bold lg:bg-zinc-800/50 backdrop-blur-md gap-10 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-700 pt-10">
      {sidebarItems.map((item, index) => (
        <SidebarItem key={index} label={item.label} active={item.active} href={item.href} />
      ))}
    </div>
  );
};

export { Sidebar, SidebarItem };