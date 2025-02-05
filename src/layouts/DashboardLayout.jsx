import React from 'react';
import Sidebar from '../components/pure/Sidebar';
import { FaBell, FaSearch } from 'react-icons/fa';
import { useSidebar } from '../context/SidebarContext';

const DashboardLayout = ({ children }) => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            
            {/* Contenido Principal */}
            <main 
                className={`
                    transition-all duration-300 
                    ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
                    min-h-screen
                    relative
                `}
            >
                {/* Header Superior */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
                    <div className="flex items-center justify-between p-4 lg:px-8">
                        {/* Barra de búsqueda */}
                        <div className="flex-1 max-w-xl">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar tareas..."
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200
                                             bg-gray-50
                                             text-gray-600
                                             placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* Acciones del Header */}
                        <div className="flex items-center ml-4 space-x-4">
                            {/* Notificaciones */}
                            <button className="relative p-2 rounded-xl hover:bg-gray-50 text-gray-600">
                                <FaBell className="text-xl" />
                                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Contenido de la Página */}
                <div className="p-4 lg:p-8 space-y-6">

                    {/* Contenedor Principal */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
