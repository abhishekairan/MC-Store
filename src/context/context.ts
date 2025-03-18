import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SidebarItem {
    label: string;
    active: boolean;
    href: string;
}

interface SidebarContextProps {
    sidebarItems: SidebarItem[];
    setSidebarItems: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);


export const useSidebar = (): SidebarContextProps => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};