/**
 * Componente de formulario de login con diseño profesional y minimalista
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login Data:', data);
        navigate('/tasks');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Please sign in to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Username Field Container */}
                        <div className="space-y-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("user", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 4,
                                            message: "Username must be at least 4 characters"
                                        }
                                    })}
                                    type="text"
                                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all"
                                    placeholder="Username"
                                />
                            </div>
                            {errors.user && (
                                <p className="text-sm text-red-500 px-4 text-left">
                                    {errors.user.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field Container */}
                        <div className="space-y-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full pl-12 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5" />
                                    ) : (
                                        <FaEye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 px-4 text-left">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember me y Forgot password */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded transition-colors"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-6 w-full py-2.5 px-4 text-white font-medium bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : 'Sign in'}
                        </button>

                        {/* Register Link */}
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/register')}
                                    className="font-medium text-gray-800 hover:text-gray-900 transition-colors"
                                >
                                    Create one
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;