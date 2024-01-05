import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../services/auth/auth.service.tsx";
import { EmailConfirmationResponse } from "../../../App.types.ts";
import { useTranslation } from "react-i18next";
import styles from "../auth-page/auth-page.module.css";
import { useAuth } from "../signup-page/auth-context/use-auth.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";

export default function EmailConfirmPage() {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation('translation', { keyPrefix: 'confirm-email' });
    const [text, setText] = useState<string>(t('initial'));

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token_id');

        if (!token) {
            return console.error('Token is missing');
        }

        authService.confirmEmail(token)
            .then((response: EmailConfirmationResponse) => {
                if (response.is_email_confirmed) {
                    const user = localStorageService.get("user");
                    const token = response.token;
                    const maxAge = 30 * 24 * 60 * 60;
                    document.cookie = `4roomToken=${token};path=/;max-age=${maxAge}`;
                    localStorageService.set("user", {...user, is_email_confirmed: true}); 
                    setText(t('success'));
                    setTimeout(()=> {
                        navigate('/authentication');
                    }, 3000)
                    setIsAuthenticated(true);
                } else {
                    setText(t('error'));
                }
            })
            .catch(() => {
                setText(t('error'));
            });
    }, []);

    return (
        <div className={`${styles.overlay} ${styles.padding__top}`}>
            <div className={styles.container__auth}>
                <h3>{text}</h3>
            </div>
        </div>
    );
}
