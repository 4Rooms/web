import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
    AddFile,
    CloseModal,
    Edit,
    SendMessage,
    Smile,
} from "../../../../assets/icons";
import styles from "./MessageForm.module.scss";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import EmojiPicker from "emoji-picker-react";
import { useParams } from "react-router-dom";

export default function MessageForm() {
    const pickerRef = useRef<HTMLDivElement | null>(null);
    const { chatId } = useParams();
    const {
        ws,
        setImageURLs,
        imageURLs,
        update,
        setUpdate,
        images,
        setImages,
    } = useChat();
    const [message, setMessage] = useState("");
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    useEffect(() => {
        setImages([]);
        setImageURLs([]);
    }, [chatId, setImageURLs, setImages]);
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (pickerRef.current && !pickerRef.current.contains(event.target) && isPickerVisible) {
                setIsPickerVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPickerVisible]);

    const toggleEmojiPicker = () => {
        setIsPickerVisible(!isPickerVisible);
    };

    const onEmojiClick = (emojiObject: any) => {
        if (update.edit) {
            setUpdate((prevState) => ({
                ...prevState,
                text: prevState.text + emojiObject.emoji,
            }));
        } else {
            setMessage((prevMessage) => prevMessage + emojiObject.emoji);
        }
        setIsPickerVisible(false);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement> | null) => {
        if (
            e &&
            e.target.files &&
            e.target.files.length < 5 &&
            e.target.files.length < 5 - imageURLs.length
        ) {
            const selectedFiles = Array.from(e.target.files);

            const imageUrls = selectedFiles.map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            }));

            setImageURLs((prevImageURLs) => [...prevImageURLs, ...imageUrls]);
            setImages((prevImages) => [...prevImages, ...selectedFiles]);
        } else {
            alert("Please select only 4 photo");
        }
    };

    async function readFile(file: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error("Error reading the file."));
            reader.readAsDataURL(file);
        });
    }

    const handleKeyDown = async (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (update.edit) {
                const messageUser = {
                    event_type: "message_was_updated",
                    id: update.id,
                    new_text: update.text,
                };
                ws?.send(JSON.stringify(messageUser));
                setUpdate((prevState) => ({ ...prevState, edit: false }));
            } else {
                if (message !== "") {
                    const messageUser = {
                        event_type: "chat_message",
                        message: {
                            chat: chatId,
                            text: message,
                            attachments: await Promise.all(
                                images.map(async (file) => ({
                                    name: file.name,
                                    content: await readFile(file),
                                }))
                            ),
                        },
                    };
                    setImages([]);
                    setImageURLs([]);
                    ws?.send(JSON.stringify(messageUser));
                    setMessage("");
                }
            }
        }
    };

    const forSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (update.edit) {
            const messageUser = {
                event_type: "message_was_updated",
                id: update.id,
                new_text: update.text,
            };
            ws?.send(JSON.stringify(messageUser));
            setUpdate((prevState) => ({ ...prevState, edit: false }));
        } else {
            if (message !== "") {
                const messageUser = {
                    event_type: "chat_message",
                    message: {
                        chat: chatId,
                        text: message,
                        attachments: await Promise.all(
                            images.map(async (file) => ({
                                name: file.name,
                                content: await readFile(file),
                            }))
                        ),
                    },
                };
                setImages([]);
                setImageURLs([]);
                ws?.send(JSON.stringify(messageUser));
                setMessage("");
            }
        }
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;
            if (update.edit) {
                setUpdate((prevState) => ({
                    ...prevState,
                    text: value,
                }));
            } else {
                setMessage(value);
            }
        },
        [setUpdate, update.edit]
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
                    <div className={styles.emoji_picker} ref={pickerRef}>
                        {isPickerVisible && (
                            <EmojiPicker onEmojiClick={onEmojiClick}  />
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
                            disabled={imageURLs.length > 3 || update.edit}
                        />
                        <AddFile />
                    </label>
                </button>
            </div>
            <label className={styles.wrapper__input}>
                <textarea
                    className={styles.input__message}
                    placeholder="Type something..."
                    value={update.edit ? update.text : message}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                {update.edit && (
                    <div>
                        <Edit />
                        <p>{update.text}</p>
                        <button
                            onClick={() =>
                                setUpdate((prevState) => ({
                                    ...prevState,
                                    edit: false,
                                }))
                            }
                        >
                            <CloseModal />
                        </button>
                    </div>
                )}
            </label>
            <button type="submit" className={styles.button__message}>
                <SendMessage />
            </button>
        </form>
    );
}
