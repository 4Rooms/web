import React, { useState } from "react";
import styles from "../Message.module.scss";
import { useAuth } from "../../../../../auth/auth-context/use-auth";
import { Delete, Edit } from "../../../../../../assets/icons";
import { useChat } from "../../../../chat-context/use-chat";

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
    };
}) {
    const { username } = useAuth();
    const { ws } = useChat();
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
                <div
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
                    {open && (
                        <div>
                            <button
                                onClick={() => {
                                    console.log(312321321321);
                                }}
                                type="button"
                            >
                                <Edit /> Edit
                            </button>
                            <button
                                onClick={() => {
                                    deleteMessageUser();
                                    console.log("message deleted");
                                }}
                                type="button"
                            >
                                <Delete /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </button>
        </li>
    );
}
