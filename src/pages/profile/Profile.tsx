import React from "react";
import styles from "./Profile.module.css";
import { profileSections } from "../../utils/profileSections";
import TitleProfile from "../../shared/title-profile/TitleProfile";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Profile() {
    const location = useLocation();
    return (
        <div className={styles.profile}>
            <div className={styles.profile_container}>
                <div className={styles.profile_sections}>
                    <ul>
                        {profileSections.map((value) => (
                            <li key={value.name}>
                                <NavLink
                                    to={
                                        value.name
                                            .replace(/\s/g, "")
                                            .toLowerCase() === "editprofile"
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
                                    onClick={() =>
                                        localStorage.setItem(
                                            "profile",
                                            value.name
                                        )
                                    }
                                    className={`${
                                        location.pathname ===
                                        `/profile/${value.name
                                            .replace(/\s/g, "")
                                            .toLowerCase()}`
                                            ? styles.active
                                            : value.name === "Edit Profile" &&
                                              location.pathname === `/profile/`
                                            ? styles.active
                                            : value.name === "Edit Password" &&
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
                <div className={styles.profile_section}>
                    <TitleProfile />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
