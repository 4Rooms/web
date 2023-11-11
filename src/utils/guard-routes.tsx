import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../pages/auth/auth-context/auth-context.tsx";

export default function GuardRoutes() {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? <Outlet/> : <Navigate to="/auth"/>
}
