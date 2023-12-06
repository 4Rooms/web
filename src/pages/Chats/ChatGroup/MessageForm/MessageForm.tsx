import React, { useState } from "react";
import { AddFile, SendMessage, Smile } from "../../../../assets/icons";
import styles from "./MessageForm.module.css";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function MessageForm() {
    const { ws, chatId } = useChat();
    const [message, setMessage] = useState("");
    const forSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (message !== "") {
            try {
                const messageUser = {
                    event_type: "chat_message",
                    message: {
                        chat: chatId,
                        text: message,
                    },
                };
                ws?.send(JSON.stringify(messageUser));
                console.log(32321)
            } catch (error) {
                console.log(error);
            }
            setMessage("");
        }
    };
    const handleChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setMessage(e.target.value);
    };
    return (
        <form className={styles.form__message} onSubmit={(e) => forSubmit(e)}>
            <div className={styles.wrapper__icon}>
                <button type="button" className={styles.button__message}>
                    <Smile />
                </button>
                <button type="button" className={styles.button__message}>
                    <AddFile />
                </button>
            </div>
            <input
                className={styles.input__message}
                placeholder="Type something..."
                type="text"
                value={message}
                onChange={(e) => handleChange(e)}
            />
            <button type="submit" className={styles.button__message}>
                <SendMessage />
            </button>
        </form>
    );
}
