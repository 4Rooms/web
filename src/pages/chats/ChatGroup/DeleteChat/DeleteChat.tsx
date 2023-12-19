import React from "react";
import styles from "./DeleteChat.module.css";
import { useChat } from "../../chat-context/use-chat";
import deleteChatCinema from "../../../../assets/deleteChatCinema.png";
import deleteChatGame from "../../../../assets/deleteChatGame.png";
import deleteChatMusic from "../../../../assets/deleteChatMusic.png";
import deleteChatBooks from "../../../../assets/deleteChatBooks.png";

export default function DeleteChat() {
    const { roomName, deleteChat } = useChat();
    return (
        <div>
            <div
                className={`${styles.welcome}  ${
                    roomName ? styles[roomName] : ""
                }`}
            >
                <img
                    src={
                        roomName === "cinema"
                            ? deleteChatCinema
                            : roomName === "books"
                            ? deleteChatBooks
                            : roomName === "music"
                            ? deleteChatMusic
                            : deleteChatGame
                    }
                />
                <h1 className={styles.welcome__title}>
                    Sorry, chat “{deleteChat.name}” has been deleted :(
                </h1>
            </div>
        </div>
    );
}
