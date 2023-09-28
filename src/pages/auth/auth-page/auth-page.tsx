import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./auth-page.module.css";

export function AuthPage() {
    const location = useLocation();
    console.log(21321)
    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <h1 className={styles.greeting__title}>Hi</h1>
                <h2 className={styles.greeting__text}>welcome to the 4Rooms</h2>
                <p className={styles.another__text}>
                    Have an account? Sign in or Sign up
                </p>
                <div className={styles.wrapper__buttons}>
                    <Link className={styles.button__in} state={{ from: location }} to="/authentication">
                        Sign in
                    </Link>
                    <Link className={styles.button__up} to="/create-account">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
