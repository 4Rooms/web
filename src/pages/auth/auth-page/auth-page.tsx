import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./auth-page.module.css";

export function AuthPage() {
    const location = useLocation();
    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <h1 className={styles.greeting__title}>Hi</h1>
                <h2 className={styles.greeting__text}>welcome to the 4Rooms</h2>
                <p className={styles.another__text}>
                    'Sign In' if you're have an account or 'Sign Up' to create
                    one.
                </p>
                <div className={styles.wrapper__buttons}>
                    <Link
                        className={styles.button__in}
                        state={{ from: location }}
                        to="/authentication"
                    >
                        <p>Sign in</p>
                    </Link>
                    <Link className={styles.button__up} to="/create-account">
                        <p>Sign up</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
