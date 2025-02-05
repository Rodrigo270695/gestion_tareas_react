import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6 py-12">
            <div className="max-w-md w-full text-center">
                {/* Icono y Número */}
                <div className="mb-8">
                    <FaExclamationTriangle className="mx-auto h-16 w-16 text-yellow-500 animate-bounce" />
                    <h1 className="mt-4 text-7xl font-bold text-gray-900">404</h1>
                </div>

                {/* Mensaje */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        ¡Página no encontrada!
                    </h2>
                    <p className="text-gray-600">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>
                </div>

                {/* Botón de regreso */}
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base 
                             font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                             transition-colors duration-200"
                >
                    <FaHome className="mr-2 -ml-1 h-5 w-5" />
                    Volver al Inicio
                </button>

                {/* Decoración de fondo */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute transform rotate-45 translate-x-1/2 translate-y-1/2">
                        <div className="w-96 h-96 border-4 border-gray-900 rounded-full" />
                    </div>
                    <div className="absolute transform -rotate-45 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-96 h-96 border-4 border-gray-900 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
