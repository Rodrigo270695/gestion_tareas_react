import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';
import { FaTimes, FaExclamationCircle, FaExclamationTriangle, FaCircle, FaPlus, FaEdit } from 'react-icons/fa';

const TaskForm = ({ add, update, closeForm, editTask }) => {
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const [selectedLevel, setSelectedLevel] = useState(LEVELS.NORMAL);
    const [isClosing, setIsClosing] = useState(false);
    const isEditing = !!editTask;

    useEffect(() => {
        if (editTask) {
            nameRef.current.value = editTask.name;
            descriptionRef.current.value = editTask.description;
            setSelectedLevel(editTask.level);
        }
    }, [editTask]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(closeForm, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            level: selectedLevel
        };

        if (isEditing) {
            update({ ...editTask, ...taskData });
        } else {
            const newTask = new Task(
                taskData.name,
                taskData.description,
                false,
                taskData.level
            );
            add(newTask);
        }

        setIsClosing(true);
        setTimeout(closeForm, 200);
    };

    const getLevelIcon = (level) => {
        switch(level) {
            case LEVELS.NORMAL:
                return <FaCircle className="w-4 h-4 text-green-500" />;
            case LEVELS.URGENT:
                return <FaExclamationCircle className="w-4 h-4 text-yellow-500" />;
            case LEVELS.BLOCKING:
                return <FaExclamationTriangle className="w-4 h-4 text-red-500" />;
            default:
                return null;
        }
    };

    const getLevelStyle = (level) => {
        if (level === selectedLevel) {
            switch(level) {
                case LEVELS.NORMAL:
                    return 'bg-green-50 border-green-500 text-green-700 shadow-green-100 shadow-inner';
                case LEVELS.URGENT:
                    return 'bg-yellow-50 border-yellow-500 text-yellow-700 shadow-yellow-100 shadow-inner';
                case LEVELS.BLOCKING:
                    return 'bg-red-50 border-red-500 text-red-700 shadow-red-100 shadow-inner';
                default:
                    return '';
            }
        }
        return 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50';
    };

    return (
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative min-h-[calc(100%-2rem)] flex items-center justify-center p-4">
                <div className={`relative w-full max-w-lg bg-white rounded-xl shadow-2xl transform transition-all duration-200 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                    {/* Header */}
                    <div className={`px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r ${isEditing ? 'from-amber-50 to-white' : 'from-blue-50 to-white'}`}>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            {isEditing ? (
                                <>
                                    <FaEdit className="w-5 h-5 mr-2 text-amber-500" />
                                    Editar Tarea
                                </>
                            ) : (
                                <>
                                    <FaPlus className="w-5 h-5 mr-2 text-blue-500" />
                                    Nueva Tarea
                                </>
                            )}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 hover:rotate-90 transition-all duration-200"
                            onClick={handleClose}
                        >
                            <FaTimes className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-6">
                            {/* Nombre */}
                            <div className="group">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2 text-left">
                                    Nombre de la tarea
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        ref={nameRef}
                                        className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-200 
                                               rounded-lg shadow-sm outline-none transition-all duration-200
                                               hover:border-gray-300 hover:shadow-md
                                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                               placeholder:text-gray-400"
                                        placeholder="Ej: Implementar nueva funcionalidad"
                                    />
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="group">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2 text-left">
                                    Descripción detallada
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="description"
                                        required
                                        ref={descriptionRef}
                                        rows={4}
                                        className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-200 
                                               rounded-lg shadow-sm outline-none transition-all duration-200
                                               hover:border-gray-300 hover:shadow-md
                                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                               placeholder:text-gray-400 resize-none"
                                        placeholder="Describe los detalles de la tarea..."
                                    />
                                </div>
                            </div>

                            {/* Nivel de Prioridad */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-3 text-left">
                                    Nivel de Prioridad
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.values(LEVELS).map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setSelectedLevel(level)}
                                            className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg 
                                                      transition-all duration-200 transform hover:scale-105 active:scale-95
                                                      ${getLevelStyle(level)} shadow-sm hover:shadow-md`}
                                        >
                                            <span className="mr-2 transition-transform duration-200 group-hover:scale-110">
                                                {getLevelIcon(level)}
                                            </span>
                                            <span className="font-medium">
                                                {level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                         rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                         focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 
                                         active:scale-95 shadow-sm hover:shadow-md"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2.5 text-sm font-medium text-white border border-transparent rounded-lg
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                                         transition-all duration-200 transform hover:scale-105 active:scale-95
                                         shadow-md hover:shadow-lg
                                         ${isEditing 
                                             ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 focus:ring-amber-500'
                                             : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-blue-500'
                                         }`}
                            >
                                {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

TaskForm.propTypes = {
    add: PropTypes.func,
    update: PropTypes.func,
    closeForm: PropTypes.func.isRequired,
    editTask: PropTypes.instanceOf(Task)
};

export default TaskForm;