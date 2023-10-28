import React from "react";
import styles from "./ChangeLanguage.module.css";
import Button from "../../../shared/button/button";
export default function ChangeLanguage() {
    return (
        <div className={styles.language__container}>
            <p className={styles.language__container_title}>
                Pick which language to use for 4ROOMS’s website.
            </p>
            <div className={styles.language__container_wrapper}>
                <div>
                    <p>English</p>
                </div>
                <div>
                    <p>Ukrainian</p>
                </div>
            </div>
            <Button className="accent" type="button">Save</Button>
        </div>
    );
}
