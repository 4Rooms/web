import React, { useState } from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { Edit } from "../../assets/icons";
import styles from "./MyChats.module.css";
import { useChat } from "../chats/chat-context/use-chat";
import { useTranslation } from "react-i18next";

export default function MyChats() {
    const { t } = useTranslation("translation");
    const [open, setOpen] = useState(false);
    const changeOpen = () => {
        setOpen(prevState => !prevState);
    }
    const { filterCreate } = useChat();
    return (
        <BasedNotificationSaved title={t('my-chart.page-title')}>
            {filterCreate.map((chat) => {
                return (
                    <li key={chat.id} className={styles.item}>
                        <BlockNotificationSaved changeOpen={changeOpen} room={chat.room} id={chat.id} open={open} time={chat.timestamp} title={chat.title} likes={chat.likes} text={chat.description} img={chat.img} />
                        <button onClick={changeOpen}>
                            <Edit />
                        </button>
                    </li>
                );
            })}
        </BasedNotificationSaved>
    );
}
