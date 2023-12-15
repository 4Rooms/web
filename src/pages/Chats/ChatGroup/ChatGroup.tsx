import React, { useEffect, useState } from "react";
import styles from "./ChatGroup.module.css";
import Infrotmation from "./Infrotmation/Infrotmation";
import Online from "./Online/Online";
import Chat from "./Chat/Chat";
import MessageForm from "./MessageForm/MessageForm";
import Welcome from "./Welcome/Welcome";
import { useChat } from "../../chats/chat-context/use-chat.tsx";

interface ProfileContextType {
    isSmallScreen?: boolean;
}

export default function ChatGroup({isSmallScreen}: ProfileContextType) {
    const { chatOpen, chatId, roomsList } = useChat();
    const [chat, setChat] = useState<{
        id?: number;
        title?: string;
        room?: string;
        img?: string;
        user?: string;
        description?: string;
        url?: string;
        timestamp?: string;
        likes?: number;
    }>({});
    useEffect(() => {
        const selectedChat = roomsList?.find((chat: {id: number, title: string, room: string, img: string, user: string, description: string, url: string, timestamp: string, likes: number}) => chat.id === chatId);
        setChat(selectedChat || {});
    }, [chatId, roomsList]);
    return (
        <div className={styles.container__chatGroups}>
            {!chatOpen && !isSmallScreen ? (
                <Welcome />
            ) : (
                <>
                    <Infrotmation user={chat.user} isSmallScreen={isSmallScreen} avatar={chat.img} title={chat?.title ?? ''} description={chat.description} timestamp={chat.timestamp} />
                    <Online />
                    <Chat />
                    <MessageForm />
                </>
            )}
        </div>
    );
}
