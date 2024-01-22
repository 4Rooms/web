import React, { Suspense, useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";
import { AuthContext } from "../../pages/auth/signup-page/auth-context/auth-context.tsx";
import { localStorageService } from "../../services/local-storage/local-storage.ts";
import { useChat } from "../../pages/chats/chat-context/use-chat.tsx";
import authService from "../../services/auth/auth.service.tsx";
import loader from "../../assets/white-shy.gif";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({ showHeader }: Props) {
    const location = useLocation();
    const { setChatOpen, setChatId } = useChat();
    const { setUsername, setUserIcon, setIsAuthenticated } = useContext(AuthContext);
    const is_verif = localStorageService?.get("user");
    const navigate = useNavigate();

    useEffect(() => {
        authService.getProfile().then((response) => {
            setUserIcon(response.data.avatar);
        });
    }, []);
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
        if (!document.cookie && is_verif !== null && is_verif.is_email_confirmed) {
            if (localStorageService.get("user")) {
                localStorageService.remove("user");
                navigate("/")
            }
            setIsAuthenticated(false);
        }
        if (location.pathname === "/") {
            setChatOpen(false);
            setChatId(null);
        }
    }, [is_verif, location, navigate, setChatId, setChatOpen, setIsAuthenticated]);

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
                    <img
                        className="bear"
                        src={loader}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            zIndex: "999",
                            transform: "translate(-50%,-50%)",
                            width: 100,
                            height: 100,
                        }}
                        alt="Gif"
                        crossOrigin="anonymous"
                    />
                }
            >
                <Outlet />
            </Suspense>
        </>
    );
}
