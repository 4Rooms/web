import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";
import { AuthContext } from "../../pages/auth/auth-context/auth-context.tsx";
import { localStorageService } from "../../services/local-storage/local-storage.ts";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({user, showHeader, isAuthenticated}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUsername, setIsAuthenticated } = useContext(AuthContext);


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            console.log('Полученный токен:', token);
            const maxAge = 30 * 24 * 60 * 60;
            document.cookie = `4roomToken=${token};path=/;max-age=${maxAge}`;
            secureApi.get('user/').then((response) => {
                setUsername(response.data.username);
                localStorageService.set("user", response.data.user);
                setIsAuthenticated(true);
                navigate('/')
            });

        }
    }, []);


    return <>
        <header className={`${styles.header__user} ${isAuthenticated && styles.authenticated}`}>
            <Navigation user={user} showHeader={showHeader}/>
        </header>
        <Outlet/>
    </>

}
