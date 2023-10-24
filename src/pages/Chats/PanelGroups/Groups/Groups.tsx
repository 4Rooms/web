import React from "react";
import styles from "./Groups.module.css";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function Groups() {
    const { roomName } = useChat();
    const groups: string[] = [
        "SpanchBob1",
        "SpanchBob2",
        "SpanchBob3",
        "SpanchBob4",
        "SpanchBob5",
        "SpanchBob6",
        "SpanchBob7",
        "SpanchBob8",
        "SpanchBob9",
        "SpanchBob32",
        "SpanchBobfew",
        "SpanchBobqw",
        "SpanchBobvvfd",
        "SpanchBobvd",
        "SpanchBobqwfd",
        "SpanchBob23",
        "SpanchBob11",
        "SpanchBobds",
        "SpanchBobgh",
        "SpanchBobkj",
    ];
    return (
        <ul className={styles.container__groups}>
            {groups.map((group) => {
                return (
                    <li className={styles.item__group} key={group}>
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
                            <p className={styles.group__text}>{group}</p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
