import React from "react";
import styles from "./Groups.module.css";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function Groups() {
    const { roomName, roomsList } = useChat();
    const cutTextFunction = (text: string) => {
        let modifiedText = "";

        if (text.length > 15) {
            modifiedText = text.substring(0, 25) + "...";
        } else {
            modifiedText = text;
        }
        return modifiedText;
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
                        >
                            <img
                                className={styles.group__avatar}
                                src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                                alt=""
                            />
                            <p className={styles.group__text}>
                                {cutTextFunction(group.title)}
                            </p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
