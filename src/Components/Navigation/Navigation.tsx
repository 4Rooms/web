import React, { useEffect, useState } from "react";
import {
    Logo,
    MobileMenu,
    MobileMenuOpen,
    MyChats,
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
    const [isOpen, setIsOpen] = useState(false);
    const { room } = useParams();
    const pathsForShowBackGround = ["cinema", "books", "games", "music"];

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
            {isOpen && (
                <div className={styles.menu__container}>
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className={styles.mobile__button}
                    >
                        <MobileMenuOpen />
                    </button>
                    <div>
                        <Link to="my-chats">
                            <p>My Chats</p>
                            <MyChats />
                        </Link>
                        <Link to="saved">
                            <p>Saved Chats</p>
                            <SavedChats />
                        </Link>
                        <Link to="/profile">
                            <p>My Profile</p>
                            <img
                                className={styles.avatar__user}
                                src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            )}
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
                <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className={styles.mobile__button}
                >
                    <MobileMenu />
                </button>
            )}
        </>
    );
}
