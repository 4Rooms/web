import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { SavedChatsTrue } from "../../assets/icons";
import styles from './Saved.module.css';
import { useChat } from "../chats/chat-context/use-chat";

export default function Saved() {
    const { filterSaved } = useChat();
    return (
        <BasedNotificationSaved title="Saved Chats">
            {filterSaved.map((chat) => {
                return (
                    <li key={chat.id} className={styles.item}>
                        <BlockNotificationSaved id={chat.id} time={chat.timestamp} title={chat.title} likes={chat.likes} text={chat.description} img={chat.img} />
                        <button>
                            <SavedChatsTrue />
                        </button>
                    </li>
                );
            })}
        </BasedNotificationSaved>
    );
}
