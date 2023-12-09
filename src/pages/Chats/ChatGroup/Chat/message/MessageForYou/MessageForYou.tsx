import React from "react";
import styles from "../Message.module.scss";
import { useAuth } from "../../../../../auth/auth-context/use-auth";

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
    const {username} = useAuth();
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function formatTime(time: string) {
        const date = new Date(Number(time) * 1000);

        const hours = date.getHours();
        const minutes = date.getMinutes();

        return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    }

    return (
        <li key={message.id} className={`${styles.message__container} ${message.user_name === username && styles.from}`}>
            {message.user_name !== username && <img className={styles.user__avatar} src={message.user_avatar} />}
            <div className={`${styles.message__user} ${message.user_name === username && styles.from}`}>
                <p
                    className={styles.user__name}
                    style={{ color: getRandomColor() }}
                >
                    {message.user_name}
                </p>
                <p className={styles.user__text}>{message.text}</p>
                <p className={styles.user__time}>
                    {formatTime(message.timestamp)}
                </p>
            </div>
        </li>
    );
}
