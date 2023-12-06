import React, { useEffect, useState } from "react";
import {
    Logo,
    MobileMenu,
    MyChats,
    Notifications,
    SavedChats,
    SearchRooms,
} from "../../assets/icons";
import styles from "./Navigation.module.css";
import { Link, useParams } from "react-router-dom";

export default function Navigation({
    user,
    showHeader,
}: {
    user: string | null;
    showHeader: boolean;
}) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { room } = useParams();
    const pathsForShowBackGround = ["cinema", "books", "games", "music"];
    console.log(pathsForShowBackGround.includes(room || ""));

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 871);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);
    return (
        <>
            <div className={styles.wrapper__logo}>
                <Link to="/" className={styles.link__logo}>
                    <Logo />
                    {!showHeader && (
                        <span className={styles.logo__name}>4ROOMS</span>
                    )}
                </Link>
                {pathsForShowBackGround.includes(room || "") &&
                    !isSmallScreen && (
                        <input
                            placeholder="Search"
                            className={styles.navigation__input}
                            type="text"
                        />
                    )}
                {pathsForShowBackGround.includes(room || "") &&
                    !isSmallScreen && (
                        <button className={styles.search__button}>
                            <SearchRooms />
                        </button>
                    )}
            </div>
            {showHeader && !isSmallScreen && (
                <nav className={styles.navigation__link}>
                    <Link to="my-chats" className={styles.icons__width}>
                        <MyChats />
                    </Link>
                    <Link to="saved" className={styles.icons__width}>
                        <SavedChats />
                    </Link>
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
            {showHeader && isSmallScreen && (
                <button type="button" className={styles.mobile__button}>
                    <MobileMenu />
                </button>
            )}
        </>
    );
}
