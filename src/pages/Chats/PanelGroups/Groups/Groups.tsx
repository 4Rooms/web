 import React from "react";
import styles from "./Groups.module.css";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function Groups() {
    const { roomName, roomsList } = useChat();
    return (
        <ul className={styles.container__groups}>
            {roomsList?.map((group) => {
                return (
                    <li className={styles.item__group} key={group.id}>
                        <button
                            type="button"
                            className={`${styles.group} ${
                                roomName ? styles[roomName] : ""
                            }`}
                        >
                            <img
                                className={styles.group__avatar}
                                src={group.img}
                                alt=""
                            />
                            <p className={styles.group__text}>{group.title}</p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
