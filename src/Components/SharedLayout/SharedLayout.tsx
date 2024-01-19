import React, { Suspense, useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";
import { AuthContext } from "../../pages/auth/signup-page/auth-context/auth-context.tsx";
import { localStorageService } from "../../services/local-storage/local-storage.ts";
import { useChat } from "../../pages/chats/chat-context/use-chat.tsx";
import authService from "../../services/auth/auth.service.tsx";
import { Vortex } from 'react-loader-spinner'

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({ showHeader }: Props) {
    const location = useLocation();
    const { setChatOpen, setChatId } = useChat();
    const { setUserIcon } = useContext(AuthContext);
    const is_verif = localStorageService?.get("user");

    useEffect(() => {
        authService.getProfile().then((response) => {
            setUserIcon(response.data.avatar);
        });
    }, []);
    useEffect(() => {
        if (location.pathname === "/") {
            setChatOpen(false);
            setChatId(null);
        }
    }, [location, setChatId, setChatOpen]);

    return (
        <>
            <header
                className={`${styles.header__user} ${
                    is_verif?.is_email_confirmed && styles.authenticated
                }`}
            >
                <Navigation showHeader={showHeader} />
            </header>
            <Suspense
                fallback={
                    <Vortex
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', "purple", "red", 'orange', 'purple']}
                        wrapperStyle={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            zIndex: '999'  
                        }}
                    />
                }
            >
                <Outlet />
            </Suspense>
        </>
    );
}
