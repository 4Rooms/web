import React from "react";
import styles from "./Chat.module.css";
import MessageForYou from "./message/MessageForYou/MessageForYou";
import MessageFromYou from "./message/MessageFromYou/MessageFromYou";

export default function Chat() {
    window.addEventListener('load', function() {
        const chatContainer: any = document.getElementById('chatContainer');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    return (
        <div className={styles.container__chat} id="chatContainer">
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
