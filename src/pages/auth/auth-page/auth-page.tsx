import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./auth-page.module.scss";
import AuthLayout from "../../../shared/auth-layout/auth-layout.tsx";
import { Button } from "../../../shared/button/button.tsx";

export function AuthPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'auth-page' });
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.style.setProperty('--special-bg-image', "url('../public/auth-background.png')");
        return () => {
            document.documentElement.style.setProperty('--special-bg-image', '');
        };
    }, []);

    return (
        <AuthLayout>
            <h1 className={styles.main_header}>{t('hi')}</h1>
            <h2>{t('welcome')}</h2>
            <p>{t('account')}</p>
            <div className={styles.action_container}>
                <Button className="default" onClick={() => navigate("/authentication")}>{t('sign in')}</Button>
                <Button className="accent" onClick={() => navigate("/create-account")}>{t('sign up')}</Button>
            </div>
        </AuthLayout>
    );
}
