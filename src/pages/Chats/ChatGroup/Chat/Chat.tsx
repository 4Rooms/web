import React from "react";
import styles from "./Chat.module.css";
import MessageForYou from "./message/MessageForYou/MessageForYou";
import MessageFromYou from "./message/MessageFromYou/MessageFromYou";
import { useParams } from "react-router-dom";

export default function Chat() {
    const { room } = useParams();
    window.addEventListener('load', function() {
        const chatContainer: any = document.getElementById('chatContainer');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    return (
        <div className={`${styles.container__chat} ${room && styles[room]}`} id="chatContainer">
            <MessageForYou />
            <MessageFromYou />
            <MessageForYou />
            <MessageFromYou />
            <MessageForYou />
            <MessageFromYou />
            <MessageForYou />
            <MessageFromYou />
            <MessageForYou />
            <MessageFromYou />
            <MessageForYou />
            <MessageFromYou />
        </div>
    );
}
