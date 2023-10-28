import React from "react";
import { Logo, Messenger, MyChats, Notifications, SavedChats } from "../../assets/icons";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

export default function Navigation({user}: { user: string | null }) {
    return (
        <>
            <Link to="/" className={styles.link__logo}>
                <Logo />
                <span className={styles.logo__name}>4ROOMS</span>
            </Link>
            <nav className={styles.navigation__link}>
                <MyChats />
                <SavedChats />
                <Notifications />
                <Messenger />
                <Link to="/profile" className={styles.link__button}>
                    {user}
                    <img className={styles.avatar__user} src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true" alt="" />
                </Link>
            </nav>
        </>
    );
}
