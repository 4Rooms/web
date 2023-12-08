import React, { useState } from "react";
import { AddFile, SendMessage, Smile } from "../../../../assets/icons";
import styles from "./MessageForm.module.scss";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import EmojiPicker from 'emoji-picker-react';

export default function MessageForm() {
    const {ws, chatId} = useChat();
    const [message, setMessage] = useState("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const toggleEmojiPicker = () => {
        setIsPickerVisible(!isPickerVisible);
    };

    const onEmojiClick = (emojiObject: any) => {
        console.log(emojiObject);
        setMessage(prevMessage => prevMessage + emojiObject.emoji);        setIsPickerVisible(false);
    };


    const forSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (message !== "") {

            ws?.send(
                JSON.stringify({
                    event_type: "chat_message",
                    message: {
                        chat: chatId,
                        text: message,
                    },
                })
            );
            console.log("321321")
        }
    };
    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setMessage(e.target.value);
    }
    return (
        <form className={styles.form__message} onSubmit={(e) => forSubmit(e)}>
            <div className={styles.wrapper__icon}>
                <div className={styles.emoji_container}>
                    <button type="button" className={styles.button__message} onClick={toggleEmojiPicker}>
                        <Smile/>
                    </button>
                    <div className={styles.emoji_picker}>
                        {isPickerVisible && (
                            <EmojiPicker onEmojiClick={onEmojiClick}/>
                            )}
                    </div>

                </div>
                    <button type="button" className={styles.button__message}>
                        <AddFile/>
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
                <SendMessage/>
            </button>
        </form>
    );
}
