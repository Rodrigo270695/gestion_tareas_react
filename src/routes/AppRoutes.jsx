import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginForm from '../components/pure/forms/loginForm';
import RegisterForm from '../components/pure/forms/registerForm';
import TaskListComponent from '../components/container/task_list';
import DashboardLayout from '../layouts/DashboardLayout';
import { SidebarProvider } from '../context/SidebarContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/register',
        element: <RegisterForm />
    },
    {
        path: '/tasks',
        element: (
            <SidebarProvider>
                <DashboardLayout>
                    <TaskListComponent />
                </DashboardLayout>
            </SidebarProvider>
        )
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
