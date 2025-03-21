"use client"

import React, { useState, useEffect } from 'react'
import Header from "@/components/header";
import { Sidebar,  } from "@/components/dashboard/Sidebar";
import { SidebarContext, SidebarItem } from "@/context/context";

const MainLayout = ({ children, }: { children: React.ReactNode; }) => {

    const [sidebarItems, setSidebarItems] = useState([
        { label: "General", active: false, href: "/dashboard/general" },
        { label: "Voting Site", active: true, href: "/dashboard/voting_sites" },
        { label: "Product", active: false, href: "/dashboard/product" },
        
        { label: "Settings", active: false, href: "/dashboard/settings" },
    ]);
    return (

        <SidebarContext.Provider value={{ sidebarItems, setSidebarItems }}>
            <div className="flex flex-col">
                <Header>
                    <div className="text-5xl __className_4116d3 text-gray-300">
                        Dashboard
                    </div>
                </Header>
            </div>
            <div className="flex-1 flex flex-row overflow-hidden">
                <div className="flex-1 flex justify-center p-10 gap-10">
                    <Sidebar />

                    <div className="flex-1 flex flex-col bg-zinc-800 text-white font-bold border-custom-no-border shadow-xl overflow-hidden">
                        <div className="px-10 py-5 flex-1 w-full text-xl overflow-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarContext.Provider>
    )
}


export const useUpdateSidebarItems = (
    sidebarItems: SidebarItem[],
    setSidebarItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>,
    activeIndex: number
  ) => {
    useEffect(() => {
      // Check if the active item is already set correctly
      const isAlreadyActive = sidebarItems.some((item, index) => item.active && index === activeIndex);
      if (!isAlreadyActive) {
        // Create a new array to avoid direct mutation
        const updatedSidebarItems = sidebarItems.map((item, index) => ({
          ...item,
          active: index === activeIndex, // Set the active item based on the provided index
        }));
        setSidebarItems(updatedSidebarItems);
      }
    }, [setSidebarItems, sidebarItems, activeIndex]);
  };


export default MainLayout
