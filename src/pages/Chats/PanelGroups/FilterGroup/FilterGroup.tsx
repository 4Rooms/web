import React, { useState } from "react";
import styles from "./FilterGroup.module.css";
import { RowBelow } from "../../../../assets/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import { useTranslation } from "react-i18next";

export default function FilterGroup() {
    const { t } = useTranslation('translation', { keyPrefix: 'filter' });

    const { roomName } = useChat();
    const arrayCategory: string[] = [t("New"), t("Popular"), t("Old")];
    const location = useLocation();
    const [show, setShow] = useState<boolean>(false);
    const [categoryChat, setCategoryChat] = useState<string>("New");
    const filterButton: string[] = ["Cinema", "Books", "Music", "Games"];
    const changeNameCategory = arrayCategory.filter(
        (category) => category !== categoryChat
    );
    return (
        <div>
            <ul className={styles.container__filterFroups}>
                {filterButton.map((text) => {
                    return (
                        <li key={text}>
                            <NavLink
                                to={`/chat/${text.toLocaleLowerCase()}`}
                                className={`${styles.button__filter} ${
                                    roomName ? styles[roomName] : ""
                                } ${
                                    location.pathname ===
                                    `/chat/${text.toLocaleLowerCase()}`
                                        ? styles.active
                                        : ""
                                }`}
                            >
                                {t(text.toLocaleLowerCase())}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <div className={styles.wrapper__new}>
                <button
                    type="button"
                    onClick={() => {
                        setShow((prevState) => !prevState);
                    }}
                    className={`${styles.button__new} ${
                        roomName ? styles[roomName] : ""
                    }`}
                >
                    {t(`${categoryChat}`).replace('filter.', '')}
                    <RowBelow />
                </button>
                {show && (
                    <ul className={styles.list__new}>
                        {changeNameCategory.map((category: string) => (
                            <li key={category} className={styles.item__new}>
                                <button
                                    onClick={(e: React.MouseEvent) => {
                                        setCategoryChat(
                                            (e.target as HTMLButtonElement)
                                                .innerText
                                        );
                                    }}
                                    className={styles.button__category_change}
                                >
                                    {t(category).replace('filter.', '')}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
