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
import { useChat } from "../../pages/chats/chat-context/use-chat";
import { useTranslation } from "react-i18next";

export default function Navigation({
    user,
    showHeader,
}: {
    user: string | null;
    showHeader: boolean;
}) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { roomsList, setChatId, setChatOpen } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { room } = useParams();
    const pathsForShowBackGround = ["cinema", "books", "games", "music"];
    const filterList =
        inputValue !== "" &&
        roomsList?.filter((room) => room.title.includes(inputValue));
    const { t } = useTranslation('translation');

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
                            className={`${styles.navigation__input} ${
                                isOpenSearch && styles.open
                            }`}
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                e.target.value.length > 0
                                    ? setIsOpenSearch(true)
                                    : setIsOpenSearch(false);
                            }}
                        />
                    )}
                {pathsForShowBackGround.includes(room || "") &&
                    !isSmallScreen && (
                        <button className={styles.search__button}>
                            <SearchRooms />
                        </button>
                    )}
                {isOpenSearch && (
                    <ul className={styles.list__chats}>
                        {Array.isArray(filterList) &&
                            filterList?.slice(0, 3).map((item) => {
                                return (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => {
                                                setInputValue("");
                                                setChatOpen(true);
                                                setChatId(item.id);
                                                setIsOpenSearch(false);
                                            }}
                                        >
                                            <img src={item.img} />{" "}
                                            <p>{item.title}</p>
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>
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
                        <button type="button" onClick={() => setIsOpen(false)}>
                            <Link to="my-chats">
                                <p>{t('my-profile.charts')}</p>
                                <MyChats />
                            </Link>
                        </button>
                        <button type="button" onClick={() => setIsOpen(false)}>
                            <Link to="saved">
                                <p>{t('my-profile.saved')}</p>
                                <SavedChats />
                            </Link>
                        </button>
                        <button type="button" onClick={() => setIsOpen(false)}>
                            <Link to="/profile">
                                <p>{t('my-profile.page-title')}</p>
                                <img
                                    className={styles.avatar__user}
                                    src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                                    alt=""
                                />
                            </Link>
                        </button>
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
            {showHeader && isSmallScreen && !isOpen && (
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
