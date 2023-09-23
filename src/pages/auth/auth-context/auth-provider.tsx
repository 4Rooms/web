import React, { ReactNode, useState } from 'react';
import { AuthContext } from './auth-context';

export function AuthProvider({children}: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
}
