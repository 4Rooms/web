import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/auth/auth-context/use-auth';

export default function GuardRoutes() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet/> : <Navigate to="/auth"/>
}
