import React from "react";
import styles from "./Groups.module.css";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function Groups() {
    const { roomName, roomsList, setChatOpen, setChatId, chatId, setDeleteChat } =
        useChat();
    const cutTextFunction = (text: string) => {
        let modifiedText = "";

        if (text?.length > 15) {
            modifiedText = text.substring(0, 10) + "...";
        } else {
            modifiedText = text;
        }
        return modifiedText;
    };
    const onClickSetChat = (id: number) => {
        setChatOpen(true);
        setChatId(id);
        setDeleteChat({
            name: "",
            delete: false,
        });
    };
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
                            onClick={() => {
                                onClickSetChat(group.id);
                            }}
                        >
                            <img
                                className={styles.group__avatar}
                                src={group.img}
                                alt=""
                            />
                            <p
                                className={`${styles.group__text} ${
                                    group.id === chatId &&
                                    roomName &&
                                    styles[roomName]
                                }`}
                            >
                                {cutTextFunction(group.title)}
                            </p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
