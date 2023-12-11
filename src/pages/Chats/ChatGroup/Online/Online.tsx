import React, { useEffect, useState } from "react";
import styles from "./Online.module.css";
import { CloseModal } from "../../../../assets/icons";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function Online() {
    const [isSmallScreen, setIsSmallScreen] = useState("");
    const { online } = useChat();

    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth < 380) {
                setIsSmallScreen("lessMobile");
            } else if (window.innerWidth < 1105) {
                setIsSmallScreen("mobile");
            } else {
                setIsSmallScreen("");
            }
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);
    const users =
        isSmallScreen === "lessMobile"
            ? online.slice(0, 3)
            : isSmallScreen === "mobile"
            ? online.slice(0, 5)
            : online;
    const [open, setOpen] = useState<boolean>(false);
    const onClickChangeOpen = (): void => {
        setOpen((prevOpen): boolean => {
            return !prevOpen;
        });
    };
    return (
        <div className={styles.container__online}>
            <p className={styles.online__text}>Online now:</p>
            <ul className={styles.online__list}>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <img
                                className={styles.online__avatar}
                                src={user.avatar}
                            />
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={onClickChangeOpen}
                type="button"
                className={styles.online__button}
            >
                {users.length > 5 && "....and others"}
            </button>
            {open && (
                <div className={styles.wrapper__online__show}>
                    <div className={styles.container__online__show}>
                        <div className={styles.wrapper__text__show}>
                            <p className={styles.text__online__show}>
                                Online now:
                            </p>
                            <button
                                className={styles.button__online__show}
                                onClick={onClickChangeOpen}
                            >
                                <CloseModal />
                            </button>
                        </div>
                        <ul className={styles.list__online__show}>
                            {users.map((user, index) => {
                                return (
                                    <li
                                        className={styles.item__online__show}
                                        key={index}
                                    >
                                        <img
                                            className={styles.online__avatar}
                                            src={user.avatar}
                                        />
                                        <p
                                            className={
                                                styles.name__online__show
                                            }
                                        >
                                            {user.username}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
