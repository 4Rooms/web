import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";
import { AuthContext } from "../../pages/auth/signup-page/auth-context/auth-context.tsx";
import { localStorageService } from "../../services/local-storage/local-storage.ts";
import { useChat } from "../../pages/chats/chat-context/use-chat.tsx";
import authService from "../../services/auth/auth.service.tsx";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({ showHeader}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setChatOpen, setChatId } = useChat()
    const { setUsername, setIsAuthenticated, setUserIcon } = useContext(AuthContext);
    const is_verif = localStorageService?.get("user");


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            const maxAge = 30 * 24 * 60 * 60;
            document.cookie = `4roomToken=${token};path=/;max-age=${maxAge}`;
            secureApi.get('user/').then((response) => {
                setUsername(response.data.username);
                localStorageService.set("user", response.data);
                if (response.data.is_email_confirmed) {
                    setIsAuthenticated(true);
                }
                navigate('/')
            });
        }
        authService.getProfile().then((response) => {
            setUserIcon(response.data.avatar);
        })
    }, []);
    useEffect(() => {
        if (location.pathname === '/') {
            setChatOpen(false);
            setChatId(null)
        }
    }, [location, setChatId, setChatOpen])


    return <>
        <header className={`${styles.header__user} ${is_verif?.is_email_confirmed && styles.authenticated}`}>
            <Navigation showHeader={showHeader}/>
        </header>
        <Outlet/>
    </>

}
