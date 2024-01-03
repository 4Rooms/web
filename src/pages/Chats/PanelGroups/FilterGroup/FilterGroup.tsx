import React, { useEffect, useState } from "react";
import styles from "./FilterGroup.module.css";
import { RowBelow } from "../../../../assets/icons";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import { useTranslation } from "react-i18next";
import { filterButton } from "../../../../utils/arrays/arrays.tsx";

export default function FilterGroup() {
    const { t } = useTranslation("translation", { keyPrefix: "filter" });
    const {room } = useParams();
    const { setChatOpen, setCategory, setChatId, setDeleteChat } = useChat();
    const arrayCategory: string[] = [t("New"), t("Popular"), t("Old")];
    const location = useLocation();
    const [show, setShow] = useState<boolean>(false);
    const [categoryChat, setCategoryChat] = useState<string>("New");
    const changeNameCategory = arrayCategory.filter(
        (category) => category !== categoryChat
    );
    useEffect(() => {
        setCategory(categoryChat.toLocaleLowerCase());
    }, [categoryChat, setCategory]);
    return (
        <div>
            <ul className={styles.container__filterFroups}>
                {filterButton.map((text) => {
                    return (
                        <li key={text}>
                            <NavLink
                                to={`/chat/${text.toLocaleLowerCase()}`}
                                className={`${styles.button__filter} ${
                                    room ? styles[room] : ""
                                } ${
                                    location.pathname ===
                                    `/chat/${text.toLocaleLowerCase()}` || room === text.toLocaleLowerCase()
                                        ? styles.active
                                        : ""
                                }`}
                                onClick={() => {
                                    setChatOpen(false);
                                    setChatId(null);
                                    setDeleteChat({
                                        name: "",
                                        delete: false,
                                    });
                                }}
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
                        room ? styles[room] : ""
                    }`}
                >
                    {t(`${categoryChat}`).replace("filter.", "")}
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
                                    {t(category).replace("filter.", "")}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
