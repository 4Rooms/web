import React, { useContext, useEffect, useState } from "react";
import {
    Logo,
    MobileMenu,
    MobileMenuOpen,
    MyChats,
    SavedChats,
    SearchRooms,
} from "../../assets/icons";
import styles from "./Navigation.module.css";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useChat } from "../../pages/chats/chat-context/use-chat";
import { useTranslation } from "react-i18next";
import { cutTextFunction } from "../../utils/cutTextFuncion/cutTextFunction";
import { AuthContext } from "../../pages/auth/signup-page/auth-context/auth-context.tsx";

export default function Navigation({
    showHeader,
}: {
    showHeader: boolean;
}) {
    const {username, userIcon} = useContext(AuthContext);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();
    const { roomsList, setChatOpen } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const { room } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const chatName = searchParams.get("chatName") ?? "";
    const pathsForShowBackGround = ["cinema", "books", "games", "music"];
    const filterList =
        chatName !== "" &&
        roomsList?.filter((room) => room.title.includes(chatName));
    const { t } = useTranslation("translation");
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
                            placeholder={t('shared.search')}
                            className={`${styles.navigation__input} ${
                                isOpenSearch && styles.open
                            }`}
                            type="text"
                            value={chatName}
                            onChange={(e) => {
                                setSearchParams({ chatName: e.target.value });
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
                                                setSearchParams({});
                                                setChatOpen(true);
                                                navigate(`/chat/${room}/${item.id}`);
                                                setIsOpenSearch(false);
                                            }}
                                        >
                                            <img src={item.img} />{" "}
                                            <p>{cutTextFunction(item.title, "navigation")}</p>
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
                                <p>{t("my-profile.charts")}</p>
                                <MyChats />
                            </Link>
                        </button>
                        <button type="button" onClick={() => setIsOpen(false)}>
                            <Link to="saved">
                                <p>{t("my-profile.saved")}</p>
                                <SavedChats />
                            </Link>
                        </button>
                        <button type="button" onClick={() => setIsOpen(false)}>
                            <Link to="/profile">
                                <p>{t("my-profile.page-title")}</p>
                                <img
                                    className={styles.avatar__user}
                                    src={userIcon ? userIcon : "https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"}
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
                        {username}
                        <img
                            className={styles.avatar__user}
                            src={userIcon ? userIcon : "https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"}
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
