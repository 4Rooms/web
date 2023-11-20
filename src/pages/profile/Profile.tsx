import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { profileSections } from "../../utils/profileSections";
import TitleProfile from "../../shared/title-profile/TitleProfile";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export default function Profile() {
    const location = useLocation();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [navigationMobile, setNavigationMobile] = useState(false);

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
            {!isSmallScreen && <h1 className={styles.title}>My profile</h1>}
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
                                    My profile
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
                                                          "Edit Profile" &&
                                                          location.pathname ===
                                                              `/profile/`) ||
                                                      (location.pathname ===
                                                          `/profile` &&
                                                          value.name ===
                                                              "Edit Profile")
                                                    ? styles.active
                                                    : value.name ===
                                                          "Edit Password" &&
                                                      location.pathname ===
                                                          `/profile/password`
                                                    ? styles.active
                                                    : ""
                                            }`}
                                        >
                                            {value.icon} {value.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {((isSmallScreen && navigationMobile) ||
                        (!isSmallScreen && true)) && (
                        <div className={styles.profile_section}>
                            <TitleProfile />
                            <Outlet />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
