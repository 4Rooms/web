import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { SavedChatsTrue } from "../../assets/icons";
import styles from "./Saved.module.scss";
import { useChat } from "../chats/chat-context/use-chat";
import { deleteSavedChat } from "../../services/chat/chat.service";
import { useTranslation } from "react-i18next";

export default function Saved() {
    const { t } = useTranslation("translation");
    const { filterSaved, setFilterSaved, setSavedChats } = useChat();
    const submitSavedChat = async (id: number) => {
        const chatTets = filterSaved.find((item) => item.chat === id);
        if (chatTets) {
            await deleteSavedChat(chatTets.id);
            setSavedChats((prevState) =>
                prevState.filter((item) => item.chat !== id)
            );
            setFilterSaved((prevState) =>
                prevState.filter((item) => item.chat !== id)
            );
        }
    };
    return (
        <BasedNotificationSaved title={t("saved-chats.page-title")}>
            {filterSaved.map((chat) => {
                return (
                    <li key={chat.id} className={styles.item}>
                        <BlockNotificationSaved
                            id={chat.id}
                            time={chat.timestamp}
                            title={chat.title}
                            likes={chat.likes}
                            text={chat.description}
                            img={chat.img}
                        />
                        <button
                            onClick={() => {
                                if (chat.chat) {
                                    submitSavedChat(chat.chat);
                                }
                            }}
                        >
                            <SavedChatsTrue />
                        </button>
                    </li>
                );
            })}
        </BasedNotificationSaved>
    );
}
