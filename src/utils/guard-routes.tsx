import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../pages/auth/signup-page/auth-context/auth-context.tsx";

export default function GuardRoutes({redirectTo}: {redirectTo: string}) {
    const {isAuthenticated} = useContext(AuthContext);
    if (redirectTo === "/auth") {
        return isAuthenticated ? <Outlet/> : <Navigate to={redirectTo}/>
    } else {
        return !isAuthenticated ? <Outlet/> : <Navigate to={redirectTo}/>
    }
}
