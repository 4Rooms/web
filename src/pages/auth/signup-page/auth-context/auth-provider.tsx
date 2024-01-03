import React, { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const user: string | null = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
    
            if (parsedUser.is_email_confirmed) {
                setIsAuthenticated(true);
                setUsername(parsedUser.username);
            }
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
