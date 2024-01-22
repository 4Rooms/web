import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
import CookieConsent from "../../shared/cookie-consent/cookie-consent.tsx";
import { getInitialCookieConsent, updateCookieConsent } from "../../utils/cookie-consent/cookie-consent.tsx";
import { useTranslation } from "react-i18next";
import { optionDashboard } from "../../utils/arrays/arrays.tsx";

export default function DashboardPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });

    const [cookieConsent, setCookieConsent] = useState(() => getInitialCookieConsent());

    useEffect(() => {
        updateCookieConsent(cookieConsent);
    }, [cookieConsent]);

    return (
        <div className={styles.dashboard}>
                <h1 className={styles.dashboard__title}>
                    {t('header')}
                </h1>
                <ul className={styles.dashboard__list}>
                    {optionDashboard.map((option) => {
                        return (
                            <li
                                className={`${styles.dashboard__item} ${styles[option.name.toLowerCase()]}`}
                                key={option.name}
                            >
                                <Link
                                    to={`/chat/${option.name.toLowerCase()}`}
                                    style={{ width: "100%" }}
                                    className={styles.dashboard__link}
                                >
                                    <div>
                                        <p className={styles.dashboard__text}>
                                            {t(option.name.toLowerCase())}
                                        </p>
                                        <p
                                            className={
                                                styles.dashboard__text_description
                                            }
                                        >
                                            {t(option.translation.toLowerCase())}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            {!cookieConsent && <CookieConsent setConsent={setCookieConsent} />}
        </div>
    );
}
