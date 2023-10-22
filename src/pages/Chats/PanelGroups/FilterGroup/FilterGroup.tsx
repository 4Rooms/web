import React from "react";
import styles from "./FilterGroup.module.css";
import { useChat } from "../../chat-context/use-chat";
import { RowBelow } from "../../../../assets/icons";
import { NavLink, useLocation } from "react-router-dom";

export default function FilterGroup() {
    const { roomName } = useChat();
    const location = useLocation();
    const filterButton: string[] = ["Cinema", "Books", "Music", "Games"];
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
            <div>
                <button
                    type="button"
                    className={`${styles.button__new} ${
                        roomName ? styles[roomName] : ""
                    }`}
                >
                    New <RowBelow />
                </button>
            </div>
        </div>
    );
}
