import React, { useState } from "react";
import styles from "./FilterGroup.module.css";
import { RowBelow } from "../../../../assets/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function FilterGroup() {
    const { roomName } = useChat();
    const arrayCategory: string[] = ["New", "Popular", "Old"];
    const location = useLocation();
    const [show, setShow] = useState<boolean>(false);
    const [categotyChat, setCategotyChat] = useState<string>("New");
    const filterButton: string[] = ["Cinema", "Books", "Music", "Games"];
    const changeNameCategory = arrayCategory.filter(
        (category) => category !== categotyChat
    );
    console.log(changeNameCategory);
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
                                {text}
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
                    {categotyChat} <RowBelow />
                </button>
                {show && (
                    <ul className={styles.list__new}>
                        {changeNameCategory.map((category: string) => (
                            <li key={category} className={styles.item__new}>
                                <button
                                    onClick={(e: React.MouseEvent) => {
                                        setCategotyChat(
                                            (e.target as HTMLButtonElement)
                                                .innerText
                                        );
                                    }}
                                    className={styles.button__category_change}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
