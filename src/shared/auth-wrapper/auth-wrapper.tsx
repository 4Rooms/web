import styles from "./auth-wrapper.module.scss";
import { Link } from "react-router-dom";
import { Back } from "../../assets/icons.tsx";
import React from "react";


export default function AuthWrapper({title, link, children}: { title: string, link: string, children: React.ReactNode }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <div className={styles.wrapper__title}>
                    <Link to={link}>
                        <Back/>
                    </Link>
                    <h3 className={styles.title__auth}>{title}</h3>
                </div>
                {children}
            </div>
        </div>
    );
}

