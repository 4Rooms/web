import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AddFile, SendMessage, Smile } from "../../../../assets/icons";
import styles from "./MessageForm.module.scss";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import EmojiPicker from "emoji-picker-react";

export default function MessageForm() {
    const { ws, chatId, setImageURLs, imageURLs } = useChat();
    const [message, setMessage] = useState("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [images, setImages] = useState<File[]>([]);

    const toggleEmojiPicker = () => {
        setIsPickerVisible(!isPickerVisible);
    };

    const onEmojiClick = (emojiObject: any) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
        setIsPickerVisible(false);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement> | null) => {
        if (e && e.target.files && e.target.files.length < 5) {
            const selectedFiles = Array.from(e.target.files);
            
            const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

            setImageURLs((prevImageURLs) => [...prevImageURLs, ...imageUrls]);
            setImages((prevImages) => [...prevImages, ...selectedFiles]);
        } else {
            alert("Please select only 4 photo")
        }
    };

    async function readFile(file: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Error reading the file.'));
            reader.readAsDataURL(file);
        });
    }

    const forSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message && ws) {
            const messageUser = {
                event_type: "chat_message",
                message: {
                    chat: chatId,
                    text: message,
                    attachments: await Promise.all(images.map(async (file) => ({
                        name: file.name,
                        content: await readFile(file),
                    }))),
                },
            };
            setImages([]);
            setImageURLs([]);
            ws.send(JSON.stringify(messageUser));
            setMessage("");
        }
    };

    const handleChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(value);
        },
        []
    );
    return (
        <form className={styles.form__message} onSubmit={forSubmit}>
            <div className={styles.wrapper__icon}>
                <div className={styles.emoji_container}>
                    <button
                        type="button"
                        className={styles.button__message}
                        onClick={toggleEmojiPicker}
                    >
                        <Smile />
                    </button>
                    <div className={styles.emoji_picker}>
                        {isPickerVisible && (
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        )}
                    </div>
                </div>
                <button className={styles.add__photo}>
                    <label className={styles.label__add}>
                        <input
                            className={styles.add__image}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple 
                            disabled={imageURLs.length > 0}
                        />
                        <AddFile />
                    </label>
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
