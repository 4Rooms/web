import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AuthPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'auth-page' });
    return (
        <div>
            <h1>{t('hi')}</h1>
            <h2>{t('welcome')}</h2>
            <p>{t('account')}</p>
            <div>
                <Link to="/authentication">{t('sign in')}</Link>
                <Link to="/create-account">{t('sign up')}</Link>
            </div>
        </div>
    );
}
