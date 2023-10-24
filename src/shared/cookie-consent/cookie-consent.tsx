import React, { Dispatch, SetStateAction } from "react";
import Button from "../button/button.tsx";
import styles from "./cookie-consent.module.scss";
import { useTranslation } from "react-i18next";

export default function CookieConsent({setConsent}: {setConsent: Dispatch<SetStateAction<boolean>>}) {
    const { t } = useTranslation('translation', { keyPrefix: 'consent' });

    return (
        <div className={styles.cookie_consent}>
            <div className={styles.cookie_consent__header}>
                <h3>{t('header')}</h3>
                <Button
                    className='accent'
                    onClick={() => {
                        setConsent(true)
                    }}>
                    {t('acceptAll')}
                </Button>
            </div>
            <p>
                {t('description.firstPart')}
                <b>{t('description.boldPart')}</b>
                {t('description.lastPart')}
            </p>
        </div>
    );
}
