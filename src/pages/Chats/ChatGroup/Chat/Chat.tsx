import React, { useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import MessageForYou from "./message/MessageForYou/MessageForYou";
import { useParams } from "react-router-dom";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

export default function Chat() {
    const { room } = useParams();
    const { message, imageURLs } = useChat();
    const chatContainerRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [message]);
    return (
        <ul
            ref={chatContainerRef}
            className={`${styles.container__chat} ${room && styles[room]} ${
                imageURLs.length > 0 && styles.image
            }`}
            id="chatContainer"
        >
            {imageURLs.length > 0
                ? imageURLs?.map((image) => {
                      return (
                          <li className={styles.item__photo}>
                              <img src={image} alt={image} />
                          </li>
                      );
                  })
                : message?.map((result) => {
                      return <MessageForYou key={result.id} message={result} />;
                  })}
        </ul>
    );
}
