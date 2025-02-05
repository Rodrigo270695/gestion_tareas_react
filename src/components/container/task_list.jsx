import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';
import TaskComponent from '../pure/task';
import { FaPlus, FaSearch, FaCheck, FaTimes, FaTrash, FaSpinner, FaEdit } from 'react-icons/fa';
import TaskForm from '../pure/forms/taskForm';
import ConfirmModal from '../pure/modals/confirmModal';
import { useNotification } from '../../context/NotificationContext';

function TaskList() {
    const defaultTask = new Task('Diseñar nueva interfaz', 'Crear mockups en Figma para el dashboard', false, LEVELS.NORMAL);
    const defaultTask2 = new Task('Reunión con cliente', 'Presentar avances del proyecto', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Error en producción', 'Solucionar bug crítico en el servidor', true, LEVELS.BLOCKING);

    const [tasks, setTasks] = useState([defaultTask, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [isTableView, setIsTableView] = useState(window.innerWidth > 768);
    const [showAddButton, setShowAddButton] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isConfirmClosing, setIsConfirmClosing] = useState(false);

    const { showNotification } = useNotification();

    useEffect(() => {
        const handleResize = () => {
            setIsTableView(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log('TODO: Cargar tareas desde un servicio');
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => {
            clearTimeout(timer);
            console.log('TODO: Guardar las tareas en un servicio');
        }
    }, [tasks]); 

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        setShowAddButton(!bottom);
    };

    const completeTask = (task) => {
        console.log('Complete this Task:', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        setTasks(tempTasks);
        showNotification(
            tempTasks[index].completed ? 'Tarea completada' : 'Tarea marcada como pendiente',
            'info'
        );
    }

    const removeTask = (task) => {
        console.log('Delete this Task:', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index, 1);
        setTasks(tempTasks);
        showNotification('Tarea eliminada', 'warning');
    }

    const addTask = (task) => {
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
        showNotification('Tarea creada exitosamente', 'success');
    }

    const updateTask = (updatedTask) => {
        const tempTasks = tasks.map(task => 
            task === taskToEdit ? updatedTask : task
        );
        setTasks(tempTasks);
        setTaskToEdit(null);
        showNotification('Tarea actualizada exitosamente', 'success');
    }

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setShowForm(true);
    }

    const handleAddClick = () => {
        setShowForm(true);
    }

    const closeForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    }

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            setIsConfirmClosing(true);
            setTimeout(() => {
                removeTask(taskToDelete);
                setTaskToDelete(null);
                setIsConfirmClosing(false);
            }, 200);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmClosing(true);
        setTimeout(() => {
            setTaskToDelete(null);
            setIsConfirmClosing(false);
        }, 200);
    };

    const filteredTasks = tasks.filter(task => 
        task.name.toLowerCase().includes(filterText.toLowerCase()) ||
        task.description.toLowerCase().includes(filterText.toLowerCase())
    );

    const pendingTasks = tasks.filter(task => !task.completed).length;

    const renderMobileView = () => ( 
        <div className="space-y-4">
            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No hay tareas</h3>
                    <p className="mt-1 text-sm text-gray-500">Comienza creando una nueva tarea</p>
                </div>
            ) : (
                filteredTasks.map((task, index) => (
                    <div key={index} 
                         className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-3
                                  transform transition duration-200 hover:scale-[1.02] hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1 flex-1">
                                <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                    {task.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <button 
                                    onClick={() => completeTask(task)}
                                    className={`p-2 rounded-full transition-all duration-200 transform active:scale-95 ${
                                        task.completed 
                                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {task.completed ? <FaCheck /> : <FaTimes />}
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(task)}
                                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200
                                             transition-all duration-200 transform active:scale-95"
                                >
                                    <FaTrash />
                                </button>
                                <button 
                                    onClick={() => handleEditTask(task)}
                                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200
                                             transition-all duration-200 transform active:scale-95"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset 
                                           transition-colors duration-200 ${
                                task.level === LEVELS.NORMAL 
                                    ? 'bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100'
                                    : task.level === LEVELS.URGENT
                                        ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 hover:bg-yellow-100'
                                        : 'bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100'
                            }`}>
                                {task.level}
                            </span>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
                                           transition-colors duration-200 ${
                                task.completed
                                    ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 hover:bg-green-100'
                                    : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/20 hover:bg-gray-100'
                            }`}>
                                {task.completed ? 'Completada' : 'Pendiente'}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent 
                                 bg-gradient-to-r from-blue-600 to-blue-400">
                        Gestión de Tareas
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Tienes <span className="font-medium text-blue-600">{pendingTasks}</span>
                        {pendingTasks === 1 ? ' tarea pendiente' : ' tareas pendientes'}
                    </p>
                </div>

                {/* Search and Add Section */}
                <div className="flex justify-between items-center mb-4">
                    <div className="relative flex-1 max-w-xs">
                        <input
                            type="text"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder="Buscar tareas..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    {/* Botón de agregar tarea para pantallas grandes */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 transition-colors duration-200"
                    >
                        <FaPlus className="w-4 h-4" />
                        Agregar Tarea
                    </button>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
                              transition-all duration-200 hover:shadow-md"
                     onScroll={handleScroll}>
                    {showForm && <TaskForm 
                        add={addTask}
                        update={updateTask}
                        closeForm={closeForm}
                        editTask={taskToEdit}
                    />}
                    {isTableView ? (
                        <div className="min-w-full divide-y divide-gray-200">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Tarea
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Descripción
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Prioridad
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Estado
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <FaSpinner className="animate-spin h-8 w-8 text-blue-500 mx-auto" />
                                                </td>
                                            </tr>
                                        ) : filteredTasks.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center">
                                                    <div className="text-gray-400 mb-2">
                                                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-medium text-gray-900">No hay tareas</h3>
                                                    <p className="mt-1 text-sm text-gray-500">Comienza creando una nueva tarea</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredTasks.map((task, index) => (
                                                <TaskComponent 
                                                    key={index}
                                                    task={task}
                                                    complete={completeTask}
                                                    remove={handleDeleteClick}
                                                    edit={handleEditTask}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        renderMobileView()
                    )}
                </div>

                {/* Footer Section */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    <span className="inline-flex items-center">
                        {tasks.length} {tasks.length === 1 ? 'tarea total' : 'tareas totales'} • 
                        {' '}<span className="text-green-600 font-medium ml-1">
                            {tasks.filter(task => task.completed).length}
                        </span> completadas
                    </span>
                </div>

                {/* Botón flotante para pantallas móviles */}
                <button
                    onClick={() => setShowForm(true)}
                    className="fixed right-4 bottom-4 md:hidden flex items-center justify-center w-14 h-14
                             bg-blue-600 text-white rounded-full shadow-lg
                             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label="Agregar nueva tarea"
                >
                    <FaPlus className="w-6 h-6" />
                </button>

                {/* Modal de confirmación */}
                {taskToDelete && (
                    <ConfirmModal
                        title="Eliminar Tarea"
                        message={`¿Estás seguro de que quieres eliminar la tarea "${taskToDelete.name}"? Esta acción no se puede deshacer.`}
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                        isClosing={isConfirmClosing}
                    />
                )}
            </div>
        </div>
    )
}

TaskList.propTypes = {
    tasks: PropTypes.array
}

export default TaskList
