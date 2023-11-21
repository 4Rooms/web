import React from "react";
import styles from "./Footer.module.css"
import { Link } from "react-router-dom";
import { Logo } from "../../assets/icons";

export default function Footer() {
    return (
        <div className={styles.chats__footer}>
            <div>
                <Link to="/" className={styles.link__logo}>
                    <Logo className={styles.footer__icon} />
                    <div>
                        <span className={styles.logo__name}>4ROOMS</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
