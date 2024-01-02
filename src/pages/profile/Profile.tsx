import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import TitleProfile from "../../shared/title-profile/TitleProfile";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Back } from "../../assets/icons";
import { useTranslation } from "react-i18next";
import { profileSections } from "../../utils/arrays/arrays";

export default function Profile() {
    const location = useLocation();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [navigationMobile, setNavigationMobile] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'my-profile' });

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 871);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <>
            {!isSmallScreen && <h1 className={styles.title}>{t('page-title')}</h1>}
            <div
                className={`${styles.profile} ${
                    isSmallScreen && styles.mobile
                }`}
            >
                <div
                    className={`${styles.profile_container} ${
                        isSmallScreen && styles.mobile
                    }`}
                >
                    {((isSmallScreen && !navigationMobile) ||
                        (!isSmallScreen && true)) && (
                        <div
                            className={`${styles.profile_sections} ${
                                isSmallScreen && styles.mobile
                            }`}
                        >
                            {isSmallScreen && (
                                <h1
                                    className={`${styles.title} ${
                                        isSmallScreen && styles.mobile
                                    }`}
                                >
                                    {t('page-title')}
                                </h1>
                            )}
                            <ul>
                                {profileSections.map((value) => (
                                    <li key={value.name}>
                                        <NavLink
                                            to={
                                                value.name
                                                    .replace(/\s/g, "")
                                                    .toLowerCase() ===
                                                "editprofile"
                                                    ? "/profile/"
                                                    : value.name
                                                          .replace(/\s/g, "")
                                                          .toLowerCase() ===
                                                      "editpassword"
                                                    ? "password"
                                                    : value.name
                                                          .replace(/\s/g, "")
                                                          .toLowerCase()
                                            }
                                            onClick={() => {
                                                localStorage.setItem(
                                                    "profile",
                                                    value.name
                                                );
                                                setNavigationMobile(true);
                                            }}
                                            className={`${
                                                location.pathname ===
                                                `/profile/${value.name
                                                    .replace(/\s/g, "")
                                                    .toLowerCase()}`
                                                    ? styles.active
                                                    : (value.name ===
                                                          "edit-profile" &&
                                                          location.pathname ===
                                                              `/profile/`) ||
                                                      (location.pathname ===
                                                          `/profile` &&
                                                          value.name ===
                                                              "edit-profile")
                                                    ? styles.active
                                                    : value.name ===
                                                          "edit-password" &&
                                                      location.pathname ===
                                                          `/profile/password`
                                                    ? styles.active
                                                    : ""
                                            }`}
                                        >
                                            {value.icon} {t(`menu.${value.name}`)}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {((isSmallScreen && navigationMobile) ||
                        (!isSmallScreen && true)) && (
                        <div className={styles.profile_section}>
                            {isSmallScreen && navigationMobile ? (
                                <div className={styles.profile_wrapper}>
                                    <button
                                        className={
                                            location.pathname === `/profile/`
                                                ? styles.edit
                                                : location.pathname ===
                                                  `/profile/logout`
                                                ? styles.logout
                                                : ""
                                        }
                                        onClick={() =>
                                            setNavigationMobile(false)
                                        }
                                    >
                                        <Back />
                                    </button>
                                    <TitleProfile />
                                </div>
                            ) : (
                                <TitleProfile />
                            )}
                            <Outlet />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
