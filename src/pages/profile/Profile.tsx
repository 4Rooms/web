import React from "react";
import styles from "./Profile.module.css";
import { profileSections } from "../../utils/profileSections";
import TitleProfile from "../../shared/title-profile/TitleProfile";
import { NavLink, Outlet } from "react-router-dom";

export default function Profile() {
    return (
        <div className={styles.profile}>
            <div className={styles.profile_container}>
                <div className={styles.profile_sections}>
                    <h2>My Profile:</h2>
                    <ul>
                        {profileSections.map((value) => (
                            <li key={value.name}>
                                <NavLink
                                    to={value.name
                                        .replace(/\s/g, "")
                                        .toLowerCase()}
                                    onClick={() =>
                                        localStorage.setItem("profile", value.name)
                                    }
                                >
                                    {value.icon} {value.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.profile_section}>
                    <TitleProfile title={localStorage.getItem("profile")}/>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
