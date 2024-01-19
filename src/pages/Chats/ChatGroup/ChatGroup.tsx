import React, { useEffect, useState } from "react";
import styles from "./ChatGroup.module.css";
import Infrotmation from "./Infrotmation/Infrotmation";
import Online from "./Online/Online";
import Chat from "./Chat/Chat";
import MessageForm from "./MessageForm/MessageForm";
import Welcome from "./Welcome/Welcome";
import { useChat } from "../../chats/chat-context/use-chat.tsx";
import DeleteChat from "../../chats/ChatGroup/DeleteChat/DeleteChat.tsx";
import { useParams } from "react-router-dom";

interface ProfileContextType {
    isSmallScreen?: boolean;
}

interface ChatType {
    id?: number;
    title?: string;
    room?: string;
    img?: string;
    user?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    likes?: number;
    user_id: number;
}

export default function ChatGroup({ isSmallScreen }: ProfileContextType) {
    const { chatId } = useParams();
    const { roomsList, deleteChat } = useChat();
    const [chat, setChat] = useState<ChatType | undefined>(undefined);

    useEffect(() => {
        const selectedChat = roomsList?.find(
            (chat: ChatType) => chat.id === Number(chatId)
        );
        setChat(selectedChat);
    }, [chatId, roomsList]);

    return (
        <div className={styles.container__chatGroups}>
            {!chatId && !isSmallScreen ? (
                deleteChat.delete ? (
                    <DeleteChat />
                ) : (
                    <Welcome isSmallScreen={isSmallScreen} />
                )
            ) : (
                <>
                    <Infrotmation
                        user={chat?.user}
                        isSmallScreen={isSmallScreen}
                        avatar={chat?.img}
                        title={chat?.title ?? ""}
                        description={chat?.description ?? ""}
                        timestamp={chat?.timestamp ?? ""}
                        likes={chat?.likes ?? 0}
                        user_id={chat?.user_id ?? 0}
                    />
                    <Online />
                    <Chat />
                    <MessageForm />
                </>
            )}
        </div>
    );
}
