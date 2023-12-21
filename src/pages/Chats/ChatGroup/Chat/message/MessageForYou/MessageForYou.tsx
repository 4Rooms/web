import React, { useState } from "react";
import styles from "../Message.module.scss";
import { useAuth } from "../../../../../auth/auth-context/use-auth";
import { Delete, Edit } from "../../../../../../assets/icons";
import { useChat } from "../../../../../chats/chat-context/use-chat.tsx";

export default function MessageForYou({
    message,
}: {
    message: {
        id: number;
        user_name: string;
        user_avatar: string;
        reactions?: {
            id: number;
            user_name: string;
            reaction: string;
            timestamp: string;
            message: number;
            user: number;
        }[];
        text: string;
        timestamp: string;
        is_deleted: boolean;
        chat: number;
        user: number;
        attachments: [string];
    };
}) {
    const { username } = useAuth();
    const { ws, setUpdate, roomName } = useChat();
    const [open, setOpen] = useState(false);
    function formatTime(time: string) {
        const date = new Date(Number(time) * 1000);

        const hours = date.getHours();
        const minutes = date.getMinutes();

        return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    }
    const openMenuMessage = () => {
        setOpen((prevState) => !prevState);
    };
    const deleteMessageUser = () => {
        const messageUser = {
            event_type: "message_was_deleted",
            id: message.id,
        };
        ws?.send(JSON.stringify(messageUser));
    };
    const clickReaction = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const reaction = e.currentTarget.textContent;
        const messageUser = {
            event_type: "message_reaction",
            id: message.id,
            reaction,
        };
        ws?.send(JSON.stringify(messageUser));
    };

    return (
        <li
            key={message.id}
            className={`${styles.message__container} ${
                message.user_name === username && styles.from
            }`}
        >
            {message.user_name !== username && (
                <img
                    className={styles.user__avatar}
                    src={message.user_avatar}
                />
            )}
            <div
                onClick={openMenuMessage}
                className={`${styles.wrapper__message}  ${
                    message.is_deleted ? styles.deleted : ""
                }`}
            >
                <span
                    className={`${styles.message__user} ${
                        message.user_name === username && styles.from
                    } ${message.is_deleted ? styles.deleted : ""}`}
                >
                    <p
                        className={`${styles.user__name} ${
                            message.is_deleted ? styles.gray : ""
                        }`}
                    >
                        {message.user_name}
                    </p>
                    {message.attachments.length > 0 && (
                        <div className={styles.message__photos}>
                            {message.attachments?.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    className={`${styles.message__photo} ${
                                        message.attachments.length === 3 &&
                                        styles.three__child
                                    }`}
                                    alt={`Photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    <p className={styles.user__text}>
                        {message.is_deleted ? (
                            <>
                                <Delete /> The message is deleted
                            </>
                        ) : (
                            message.text
                        )}
                    </p>

                    <p className={styles.user__time}>
                        {formatTime(message.timestamp)}
                    </p>
                    <ul className={styles.list__reactions}>
                        {message.reactions?.map((user) => {
                            return (
                                <li
                                    key={user.id}
                                >
                                    <button type="button" className={roomName ? styles[roomName] : ""}>
                                        {user.reaction}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {open && !message.is_deleted && (
                        <div
                            className={`${styles.menu__message} ${
                                message.text.length > 74 && styles.more
                            }`}
                        >
                            {username === message.user_name && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUpdate({
                                                edit: true,
                                                text: message.text,
                                                id: message.id,
                                            });
                                        }}
                                    >
                                        <Edit /> Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            deleteMessageUser();
                                        }}
                                    >
                                        <Delete /> Delete
                                    </button>
                                </>
                            )}
                            <ul className={styles.reaction}>
                                <li>
                                    <button
                                        onClick={(e) => clickReaction(e)}
                                        type="button"
                                    >
                                        😀
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={(e) => clickReaction(e)}
                                        type="button"
                                    >
                                        😈
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={(e) => clickReaction(e)}
                                        type="button"
                                    >
                                        😎
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={(e) => clickReaction(e)}
                                        type="button"
                                    >
                                        💀
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={(e) => clickReaction(e)}
                                        type="button"
                                    >
                                        👻
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </span>
            </div>
        </li>
    );
}
