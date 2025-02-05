import React from 'react';
import PropTypes from 'prop-types';
import { Task as TaskModel } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';
import { FaCheckCircle, FaCircle, FaTrash, FaEdit } from 'react-icons/fa';

const Task = ({ task, complete, remove, edit }) => {
    
    const taskLevelBadge = () => {
        switch (task.level) {
            case LEVELS.NORMAL:
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Normal
                    </span>
                );
            case LEVELS.URGENT:
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Urgente
                    </span>
                );
            case LEVELS.BLOCKING:
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Bloqueante
                    </span>
                );
            default:
                break;
        }
    }

    const getLevelBadgeClass = () => {
        switch (task.level) {
            case LEVELS.NORMAL:
                return 'bg-green-50 text-green-700';
            case LEVELS.URGENT:
                return 'bg-yellow-50 text-yellow-700';
            case LEVELS.BLOCKING:
                return 'bg-red-50 text-red-700';
            default:
                return '';
        }
    }

    const taskCompletedIcon = () => {
        if(task.completed) {
            return <FaCheckCircle className="w-5 h-5 text-green-500" />
        } else {
            return <FaCircle className="w-5 h-5 text-gray-400" />
        }
    }

    const taskCompleted = {
        color: task.completed ? 'text-gray-500' : 'text-gray-900',
        textDecoration: task.completed ? 'line-through' : 'none'
    }

    return (
        <tr className="group hover:bg-gray-50 transition-all duration-200">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    <span className={`${task.completed ? 'text-gray-400 line-through' : ''} 
                                   break-words whitespace-normal group-hover:text-blue-600
                                   transition-colors duration-200`}>
                        {task.name}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-500 break-words whitespace-normal line-clamp-2 max-w-xs
                              group-hover:text-gray-900 transition-colors duration-200">
                    {task.description}
                </div>
            </td>
            <td className="px-3 py-4 text-sm">
                <span className={getLevelBadgeClass()}>
                    {task.level}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                               transition-all duration-200
                               ${task.completed 
                                   ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 hover:bg-green-100' 
                                   : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/20 hover:bg-gray-100'}`}>
                    <span className="transform transition-transform duration-200 group-hover:scale-110">
                        {task.completed ? 
                            <FaCheckCircle className="mr-1 w-3 h-3" /> : 
                            <FaCircle className="mr-1 w-3 h-3" />
                        }
                    </span>
                    <span className="hidden sm:inline">
                        {task.completed ? 'Completada' : 'Pendiente'}
                    </span>
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-2 sm:space-x-3 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    <label className="relative inline-flex items-center cursor-pointer group/switch">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={task.completed}
                            onChange={() => complete(task)}
                        />
                        <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 
                                      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                      rounded-full peer transition-all duration-300 ease-in-out
                                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                                      after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 
                                      after:transition-all after:duration-300 after:ease-in-out
                                      peer-checked:bg-blue-600 group-hover/switch:after:scale-95"></div>
                    </label>
                    <button 
                        onClick={() => edit(task)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full 
                                 hover:bg-blue-50 transition-all duration-200 transform
                                 hover:scale-110 active:scale-95 focus:outline-none
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        title="Editar tarea"
                    >
                        <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button 
                        onClick={() => remove(task)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-full 
                                 hover:bg-red-50 transition-all duration-200 transform
                                 hover:scale-110 active:scale-95 focus:outline-none
                                 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        title="Eliminar tarea"
                    >
                        <FaTrash className="w-3.5 h-3.5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

Task.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

export default Task;
