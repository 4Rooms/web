import React from "react";
import styles from "./Welcome.module.css";
import { useChat } from "../../chat-context/use-chat";

export default function Welcome() {
    const { roomName } = useChat();
    return (
        <div className={`${styles.welcome}  ${roomName ? styles[roomName] : ""}`}>
            <h1 className={styles.welcome__title}>
                Welcome to the {roomName?.charAt(0).toUpperCase()}
                {roomName?.slice(1)} room!
            </h1>
            <p className={styles.welcome__text}>
                Choose any chat from the list on the left and start chatting. If
                you haven't found an interesting chat, create a new one using
                the <span className={styles.welcome__span}>"Create chat"</span>{" "}
                button.
            </p>
        </div>
    );
}
