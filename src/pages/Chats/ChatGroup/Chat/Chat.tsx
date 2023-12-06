import React from "react";
import styles from "./Chat.module.css";
import MessageForYou from "./message/MessageForYou/MessageForYou";
import MessageFromYou from "./message/MessageFromYou/MessageFromYou";
import { useParams } from "react-router-dom";
import { useChat } from "../../chat-context/use-chat";

export default function Chat() {
    const { room } = useParams();
    const { message } = useChat();
    window.addEventListener("load", function () {
        const chatContainer: any = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    console.log(message.results);
    return (
        <ul
            className={`${styles.container__chat} ${room && styles[room]}`}
            id="chatContainer"
        >
            {message.results?.map((result) => {
                return <MessageForYou message={result} />;
            })}
        </ul>
    );
}
