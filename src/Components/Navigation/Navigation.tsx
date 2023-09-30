import React from "react";
import { Logo } from "../../assets/icons";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
            <Link to="/" className={styles.link__logo}>
                <Logo />
                <span className={styles.logo__name}>4ROOMS</span>
            </Link>
    );
}
