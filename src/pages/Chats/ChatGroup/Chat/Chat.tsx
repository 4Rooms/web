import React, { useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import { useParams } from "react-router-dom";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import Message from "./Message/Message.tsx";
import { Delete } from "../../../../assets/icons.tsx";

export default function Chat() {
    const { room } = useParams();
    const { message, imageURLs, chatOpen, setImageURLs, setImages } = useChat();
    const chatContainerRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (!chatContainer) {
            return;
        }

        const handleScrollToBottom = () => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        };

        handleScrollToBottom();

        const observer = new MutationObserver(handleScrollToBottom);
        observer.observe(chatContainer, { childList: true });

        return () => {
            observer.disconnect();
        };
    }, [chatOpen]);

    const clickDeletePhoto = (image: { name: string; url: string }) => {
        setImageURLs((prevState) =>
            prevState.filter((imageURL) => imageURL.url !== image.url)
        );
        setImages(prevState => prevState.filter(imageFile => imageFile.name !== image.name))
    };

    return (
        <ul
            ref={chatContainerRef}
            className={`${styles.container__chat} ${room && styles[room]} ${
                imageURLs.length > 0 && styles.image
            }`}
            id="chatContainer"
        >
            {imageURLs.length > 0
                ? imageURLs?.map((image, index) => {
                      return (
                          <li
                              key={index}
                              className={`${styles.item__photo} ${
                                  imageURLs?.length === 3
                                      ? styles.three__child
                                      : imageURLs?.length === 1
                                      ? styles.one__child
                                      : imageURLs?.length === 2
                                      ? styles.two__child
                                      : ""
                              }`}
                          >
                              <img src={image.url} alt={image.name} />
                              <button onClick={() => clickDeletePhoto(image)}>
                                  <Delete />
                              </button>
                          </li>
                      );
                  })
                : message?.map((result) => {
                      return <Message key={result.id} message={result} />;
                  })}
        </ul>
    );
}
