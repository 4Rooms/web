import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../services/auth/auth.service.tsx";
import { EmailConfirmationResponse } from "../../../App.types.ts";
import { useTranslation } from "react-i18next";
import styles from "../auth-page/auth-page.module.css";

export default function EmailConfirmPage() {
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
                    setText(t('success'));
                    setTimeout(()=> {
                        navigate('/authentication');
                    }, 3000)
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
