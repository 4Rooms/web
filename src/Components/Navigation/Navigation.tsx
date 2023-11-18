import React from "react";
import {
    Logo,
    Messenger,
    MyChats,
    Notifications,
    SavedChats,
    SearchRooms,
} from "../../assets/icons";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

export default function Navigation({
    user,
    showHeader,
}: {
    user: string | null;
    showHeader: boolean;
}) {
    return (
        <>
            <div className={styles.wrapper__logo}>
                <Link to="/" className={styles.link__logo}>
                    <Logo />
                    {!showHeader && (
                        <span className={styles.logo__name}>4ROOMS</span>
                    )}
                </Link>
                {showHeader && (
                    <input 
                    placeholder="Search" className={styles.navigation__input} type="text" />
                )}
                {showHeader && (
                    <button className={styles.search__button}>
                        <SearchRooms />
                    </button>
                )}
            </div>
            {showHeader && (
                <nav className={styles.navigation__link}>
                    <MyChats />
                    <SavedChats />
                    <Notifications />
                    <Messenger />
                    <Link to="/profile" className={styles.link__button}>
                        {user}
                        <img
                            className={styles.avatar__user}
                            src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                            alt=""
                        />
                    </Link>
                </nav>
            )}
        </>
    );
}
