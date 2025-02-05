import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar debe ser usado dentro de un SidebarProvider');
    }
    return context;
};
