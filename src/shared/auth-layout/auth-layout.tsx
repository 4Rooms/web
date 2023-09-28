import React from "react";
import styles from "./auth-layout.module.scss";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={styles.authBox}>
            {children}
        </div>
    )
}
