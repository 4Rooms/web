import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";
import { AuthContext } from "../../pages/auth/signup-page/auth-context/auth-context.tsx";
import { localStorageService } from "../../services/local-storage/local-storage.ts";
import { useChat } from "../../pages/chats/chat-context/use-chat.tsx";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({user, showHeader}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setChatOpen, setChatId } = useChat()
    const { setUsername, setIsAuthenticated } = useContext(AuthContext);
    const is_verif = localStorageService?.get("user");


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            console.log(token);
            const maxAge = 30 * 24 * 60 * 60;
            document.cookie = `4roomToken=${token};path=/;max-age=${maxAge}`;
            secureApi.get('user/').then((response) => {
                console.log(response.data);
                setUsername(response.data.username);
                console.log(response.data);
                localStorageService.set("user", response.data);
                setIsAuthenticated(true);
                navigate('/')
            });
        }
        
    }, []);
    useEffect(() => {
        if (location.pathname === '/') {
            setChatOpen(false);
            setChatId(null)
        }
    }, [location, setChatId, setChatOpen])


    return <>
        <header className={`${styles.header__user} ${is_verif?.is_email_confirmed && styles.authenticated}`}>
            <Navigation user={user} showHeader={showHeader}/>
        </header>
        <Outlet/>
    </>

}
