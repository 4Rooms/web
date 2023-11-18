import React, { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsAuthenticated(true);
            setUsername(JSON.parse(user).username);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) return null;

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
}
