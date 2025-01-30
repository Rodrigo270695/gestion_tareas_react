import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Toast from '../components/pure/notifications/toast';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'success') => {
        const id = Date.now();
        setNotifications(prev => [...prev.slice(-4), { id, message, type, isClosing: false }]); // Limitar a 5 notificaciones
    }, []);

    const closeNotification = useCallback((id) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, isClosing: true } : notif
            )
        );

        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 300);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
                <div className="flex flex-col items-end space-y-3">
                    {notifications.map(({ id, message, type, isClosing }) => (
                        <div key={id} className="pointer-events-auto w-full max-w-sm">
                            <Toast
                                message={message}
                                type={type}
                                isClosing={isClosing}
                                onClose={() => closeNotification(id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
