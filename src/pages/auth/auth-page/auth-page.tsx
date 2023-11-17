import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./auth-page.module.css";
import { useTranslation } from "react-i18next";

export function AuthPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'auth-page' });
    const location = useLocation();

    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <h2 className={styles.greeting__text}>{t('welcome')}</h2>
                <p className={styles.another__text}>
                    {t('account')}
                </p>
                <div className={styles.wrapper__buttons}>
                    <Link
                        className={styles.button__in}
                        state={{ from: location }}
                        to="/authentication"
                    >
                        <p>{t('sign in')}</p>
                    </Link>
                    <Link className={styles.button__up} to="/create-account">
                        <p>{t('sign up')}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
