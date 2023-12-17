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
    const { ws } = useChat();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState(message.text);
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
    const editMessage = () => {
        const messageUser = {
            event_type: "message_was_updated",
            id: message.id,
            new_text: inputValue,
        };
        ws?.send(JSON.stringify(messageUser));
        setEdit(false);
    };
    const handleChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setInputValue(e.target.value);
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
            <button
                onClick={openMenuMessage}
                className={message.is_deleted ? styles.deleted : ""}
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
                    <div className={styles.message__photos}>
                        {message.attachments?.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                className={`${styles.message__photo} ${message.attachments.length === 3 && styles.three__child}`}
                                alt={`Photo ${index + 1}`}
                            />
                        ))}
                    </div>
                    {edit ? (
                        <>
                            <label>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    value={inputValue}
                                    type="text"
                                />
                            </label>
                            <div
                                className={styles.edit__message}
                                onClick={() => {
                                    editMessage();
                                }}
                            >
                                save
                            </div>
                        </>
                    ) : (
                        <p className={styles.user__text}>
                            {message.is_deleted ? (
                                <>
                                    <Delete /> The message is deleted
                                </>
                            ) : (
                                message.text
                            )}
                        </p>
                    )}
                    <p className={styles.user__time}>
                        {formatTime(message.timestamp)}
                    </p>
                    {open && !message.is_deleted && !edit && (
                        <div className={styles.menu__message}>
                            {username === message.user_name && (
                                <>
                                    <div
                                        onClick={() => {
                                            setEdit(true);
                                        }}
                                    >
                                        <Edit /> Edit
                                    </div>
                                    <div
                                        onClick={() => {
                                            deleteMessageUser();
                                        }}
                                    >
                                        <Delete /> Delete
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </span>
            </button>
        </li>
    );
}
