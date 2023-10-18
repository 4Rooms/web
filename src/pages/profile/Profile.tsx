import React from "react";
import styles from "./Profile.module.css";
import { profileSections } from "../../utils/profileSections";
import TitleProfile from "../../shared/title-profile/TitleProfile";

export default function Profile() {
    return (
        <div className={styles.profile}>
            <div className={styles.profile_container}>
                <div className={styles.profile_sections}>
                    <h2>My Profile:</h2>
                    <ul>
                        {profileSections.map(value => (
                            <li key={value.name}>{value.icon} {value.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.profile_section}>
                    <TitleProfile title="Edit Your Profile" />
                </div>
            </div>
        </div>
    );
}
