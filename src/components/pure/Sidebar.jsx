import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { 
    FaTasks, 
    FaUserCircle, 
    FaBars, 
    FaSignOutAlt, 
    FaPlus, 
    FaTimes,
    FaChartLine,
    FaCog,
    FaInbox,
    FaCalendarAlt,
    FaChevronDown,
    FaListUl,
    FaCheckCircle,
    FaClock,
    FaArchive,
    FaUsers,
    FaUserCog,
    FaBell
} from 'react-icons/fa';

const Sidebar = () => {
    const { isCollapsed, setIsCollapsed } = useSidebar();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [expandedMenus, setExpandedMenus] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        navigate('/login');
    };

    const toggleSubmenu = (menuId) => {
        if (isCollapsed) {
            setIsCollapsed(false);
        }
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const menuItems = [
        {
            id: 'dashboard',
            icon: FaChartLine,
            text: 'Dashboard',
            path: '/dashboard'
        },
        {
            id: 'tasks',
            icon: FaTasks,
            text: 'Tareas',
            submenu: [
                {
                    icon: FaListUl,
                    text: 'Todas las Tareas',
                    path: '/tasks/all'
                },
                {
                    icon: FaCheckCircle,
                    text: 'Completadas',
                    path: '/tasks/completed'
                },
                {
                    icon: FaClock,
                    text: 'Pendientes',
                    path: '/tasks/pending'
                },
                {
                    icon: FaArchive,
                    text: 'Archivadas',
                    path: '/tasks/archived'
                }
            ]
        },
        {
            id: 'team',
            icon: FaUsers,
            text: 'Equipo',
            submenu: [
                {
                    icon: FaUsers,
                    text: 'Miembros',
                    path: '/team/members'
                },
                {
                    icon: FaTasks,
                    text: 'Asignaciones',
                    path: '/team/assignments'
                }
            ]
        },
        {
            id: 'settings',
            icon: FaCog,
            text: 'Configuración',
            submenu: [
                {
                    icon: FaUserCog,
                    text: 'Perfil',
                    path: '/settings/profile'
                },
                {
                    icon: FaBell,
                    text: 'Notificaciones',
                    path: '/settings/notifications'
                }
            ]
        }
    ];

    const isActive = (path) => location.pathname === path;

    const menuItemBaseClass = `
        w-full flex items-center p-3.5 rounded-xl
        transition-all duration-200 relative
        font-medium text-sm
    `;
    
    const getMenuItemClass = (isItemActive) => `
        ${menuItemBaseClass}
        ${isCollapsed ? 'justify-center' : 'justify-between'}
        ${isItemActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-50'}
    `;

    const renderMenuItem = (item) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isMenuExpanded = expandedMenus[item.id];
        const isItemActive = item.path ? isActive(item.path) : false;
        const isSubmenuActive = hasSubmenu && item.submenu.some(subItem => isActive(subItem.path));

        return (
            <div key={item.id} className="relative">
                <button
                    onClick={() => hasSubmenu ? toggleSubmenu(item.id) : navigate(item.path)}
                    className={`
                        ${getMenuItemClass(isItemActive || isSubmenuActive)}
                        w-full flex items-center p-3.5 rounded-xl
                        transition-all duration-200
                        font-medium text-sm
                        ${isCollapsed ? 'justify-center' : 'justify-between'}
                    `}
                >
                    <div className="flex items-center space-x-3">
                        <item.icon className={`text-xl ${(isItemActive || isSubmenuActive) ? 'text-blue-600' : 'text-gray-400'}`} />
                        {!isCollapsed && (
                            <span>{item.text}</span>
                        )}
                    </div>
                    {!isCollapsed && hasSubmenu && (
                        <FaChevronDown 
                            className={`
                                transform transition-transform duration-300 ease-in-out
                                ${isMenuExpanded ? 'rotate-180' : 'rotate-0'}
                            `} 
                        />
                    )}
                </button>

                {/* Submenú con animación mejorada */}
                {hasSubmenu && !isCollapsed && (
                    <div 
                        className={`
                            overflow-hidden transition-all duration-300 ease-in-out
                            ${isMenuExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                        `}
                    >
                        <div className={`
                            mt-1 ml-4 space-y-1
                            transform transition-all duration-300 ease-in-out
                            ${isMenuExpanded ? 'translate-y-0' : '-translate-y-4'}
                        `}>
                            {item.submenu.map((subItem) => {
                                const isSubItemActive = isActive(subItem.path);
                                return (
                                    <button
                                        key={subItem.path}
                                        onClick={() => navigate(subItem.path)}
                                        className={`
                                            w-full flex items-center p-2.5 rounded-lg
                                            transition-all duration-200
                                            text-sm
                                            ${isSubItemActive 
                                                ? 'bg-blue-50 text-blue-600' 
                                                : 'text-gray-600 hover:bg-gray-50'}
                                        `}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <subItem.icon className={`text-lg ${isSubItemActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                            <span>{subItem.text}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Overlay para móvil */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Botón de menú móvil */}
            {isMobile && (
                <button
                    className="fixed top-4 right-4 z-50 p-3 rounded-xl bg-white shadow-lg text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed top-0 left-0 h-screen
                    bg-white border-r border-gray-100
                    shadow-lg shadow-gray-100/20
                    z-50
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'w-20' : 'w-72'}
                    lg:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo y Toggle */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                <FaTasks className="text-white" />
                            </div>
                            <h1 className="text-lg font-bold text-gray-800">
                                TaskFlow
                            </h1>
                        </div>
                    )}
                    <button
                        className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors lg:block hidden"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <FaBars />
                    </button>
                </div>

                {/* Perfil del Usuario */}
                <div className={`p-4 border-b border-gray-100 ${isCollapsed ? 'text-center' : ''}`}>
                    <div className="flex items-center justify-center mb-3">
                        <div className="relative group">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <FaUserCircle className="text-2xl" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                    {!isCollapsed && (
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-800">Juan Pérez</h3>
                            <p className="text-sm text-gray-500">juan@email.com</p>
                        </div>
                    )}
                </div>

                {/* Menú de Navegación */}
                <nav className="p-4 space-y-2">
                    {menuItems.map(renderMenuItem)}
                </nav>

                {/* Botón de Cerrar Sesión */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`
                            ${menuItemBaseClass}
                            ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                            text-gray-600 hover:bg-red-50 hover:text-red-600
                        `}
                    >
                        <FaSignOutAlt className="text-xl" />
                        {!isCollapsed && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
