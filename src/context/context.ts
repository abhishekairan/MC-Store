import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarItem {
    label: string;
    active: boolean;
}

interface SidebarContextProps {
    sidebarItems: SidebarItem[];
    setSidebarItems: (items: SidebarItem[]) => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);


export const useSidebar = (): SidebarContextProps => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};