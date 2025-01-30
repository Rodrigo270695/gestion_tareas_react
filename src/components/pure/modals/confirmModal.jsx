import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const ConfirmModal = ({ title, message, onConfirm, onCancel, isClosing }) => {
    return (
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 
                      transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative min-h-[calc(100%-2rem)] flex items-center justify-center p-4">
                <div className={`relative w-full max-w-md bg-white rounded-xl shadow-2xl transform transition-all duration-200 
                             ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-red-50 to-white">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <FaExclamationTriangle className="w-5 h-5 mr-2 text-red-500" />
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 hover:rotate-90 transition-all duration-200"
                            onClick={onCancel}
                        >
                            <FaTimes className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <p className="text-gray-600">
                            {message}
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                       rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                       focus:ring-gray-500 transition-all duration-200 transform hover:scale-105 
                                       active:scale-95 shadow-sm hover:shadow-md"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 
                                       border border-transparent rounded-lg hover:from-red-700 hover:to-red-600 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                                       transition-all duration-200 transform hover:scale-105 active:scale-95
                                       shadow-md hover:shadow-lg"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isClosing: PropTypes.bool.isRequired
};

export default ConfirmModal;
