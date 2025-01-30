import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes, FaInfo, FaExclamationTriangle, FaBell } from 'react-icons/fa';
import './toast.css';

const Toast = ({ message, type = 'success', onClose, isClosing }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheck className="w-5 h-5" />;
            case 'error':
                return <FaTimes className="w-5 h-5" />;
            case 'warning':
                return <FaExclamationTriangle className="w-5 h-5" />;
            case 'info':
                return <FaInfo className="w-5 h-5" />;
            default:
                return <FaBell className="w-5 h-5" />;
        }
    };

    const getStyles = () => {
        const baseStyles = `
            fixed top-4 right-4 flex items-start p-3
            transform transition-all duration-300 backdrop-blur-sm
            max-w-sm w-full toast-container
            bg-gradient-to-r from-white/95 to-white/90
            shadow-[0_5px_15px_rgba(0,0,0,0.08)]
            rounded-2xl
        `;

        const typeStyles = {
            success: `
                shadow-[0_8px_16px_rgba(34,197,94,0.15)]
                ring-1 ring-green-100
            `,
            error: `
                shadow-[0_8px_16px_rgba(239,68,68,0.15)]
                ring-1 ring-red-100
            `,
            warning: `
                shadow-[0_8px_16px_rgba(234,179,8,0.15)]
                ring-1 ring-yellow-100
            `,
            info: `
                shadow-[0_8px_16px_rgba(59,130,246,0.15)]
                ring-1 ring-blue-100
            `
        };

        const animationStyles = isClosing 
            ? 'translate-x-full opacity-0' 
            : 'translate-x-0 opacity-100';

        return `${baseStyles} ${typeStyles[type]} ${animationStyles}`;
    };

    const getIconContainerStyles = () => {
        const baseStyles = "p-2 rounded-xl flex-shrink-0 bg-gradient-to-br";
        const typeStyles = {
            success: "from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30",
            error: "from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30",
            warning: "from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30",
            info: "from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
        };
        return `${baseStyles} ${typeStyles[type]}`;
    };

    const getProgressBarStyles = () => {
        const baseStyles = "absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300 mx-3";
        const typeStyles = {
            success: "bg-gradient-to-r from-green-500 to-green-600",
            error: "bg-gradient-to-r from-red-500 to-red-600",
            warning: "bg-gradient-to-r from-yellow-500 to-yellow-600",
            info: "bg-gradient-to-r from-blue-500 to-blue-600"
        };
        return `${baseStyles} ${typeStyles[type]}`;
    };

    const getTitle = () => {
        switch (type) {
            case 'success':
                return '¡Éxito!';
            case 'error':
                return '¡Error!';
            case 'warning':
                return '¡Atención!';
            case 'info':
                return 'Información';
            default:
                return 'Notificación';
        }
    };

    return (
        <div className={getStyles()}>
            {/* Contenido principal */}
            <div className="flex items-start gap-4 w-full relative">
                <div className={getIconContainerStyles()}>
                    {getIcon()}
                </div>
                <div className="flex-grow min-w-0 pt-1">
                    <h4 className="font-semibold text-gray-900 text-sm leading-5 mb-0.5">
                        {getTitle()}
                    </h4>
                    <p className="text-gray-600 text-sm leading-5">
                        {message}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 -mt-1 -mr-1 text-gray-400 hover:text-gray-600
                             focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                             rounded-lg p-1.5 transition-all duration-200
                             hover:bg-gray-100 active:bg-gray-200"
                >
                    <FaTimes className="w-4 h-4" />
                </button>
            </div>

            {/* Progress bar background */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100/50 mx-3 rounded-full" />
            
            {/* Progress bar */}
            <div className={`${getProgressBarStyles()} progress-bar`} />
        </div>
    );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    onClose: PropTypes.func.isRequired,
    isClosing: PropTypes.bool.isRequired
};

export default Toast;
