import React from "react";
import styles from "./DeleteChat.module.css";
import { useChat } from "../../chat-context/use-chat";
import deleteChatCinema from "../../../../assets/deleteChatCinema.png";
import deleteChatGame from "../../../../assets/deleteChatGame.png";
import deleteChatMusic from "../../../../assets/deleteChatMusic.png";
import deleteChatBooks from "../../../../assets/deleteChatBooks.png";
import { useParams } from "react-router-dom";
import { cutTextFunction } from "../../../../utils/cutTextFuncion/cutTextFunction";

export default function DeleteChat({ isSmallScreen }: { isSmallScreen?: boolean}) {
    const {room} = useParams();
    const { deleteChat } = useChat();
    return (
        <div>
            <div
                className={`${styles.welcome}  ${
                    room ? styles[room] : ""
                }`}
            >
                <img
                    src={
                        room === "cinema"
                            ? deleteChatCinema
                            : room === "books"
                            ? deleteChatBooks
                            : room === "music"
                            ? deleteChatMusic
                            : deleteChatGame
                    }
                />
                <h1 className={styles.welcome__title}>
                    Sorry, chat “{cutTextFunction(deleteChat.name, "delete", isSmallScreen)}” has been deleted :(
                </h1>
            </div>
        </div>
    );
}
