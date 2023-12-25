import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { Edit } from "../../assets/icons";
import styles from "./MyChats.module.css";
import { useChat } from "../chats/chat-context/use-chat";

export default function MyChats() {
    const { filterCreate } = useChat();
    return (
        <BasedNotificationSaved title="My Chats">
            {filterCreate.map((chat) => {
                return (
                    <li key={chat.id} className={styles.item}>
                        <BlockNotificationSaved time={chat.timestamp} title={chat.title} likes={chat.likes} text={chat.description} img={chat.img} />
                        <button>
                            <Edit />
                        </button>
                    </li>
                );
            })}
        </BasedNotificationSaved>
    );
}
