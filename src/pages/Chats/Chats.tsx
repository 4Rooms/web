import React, { useEffect, useState } from "react";
import styles from "./Chats.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";
import { useParams } from "react-router-dom";
import { useChat } from "../chats/chat-context/use-chat.tsx";
import {
    getAllMessages,
    getChatsRoom,
    getSavedChats,
} from "../../services/chat/chat.service";
import Footer from "../../Components/Footer/Footer.tsx";
import Welcome from "./ChatGroup/Welcome/Welcome.tsx";
import DeleteChat from "../chats/ChatGroup/DeleteChat/DeleteChat.tsx";
import { socketUrl } from "../../utils/webSocket/webSocket.tsx";

export default function Chats() {
    const { room, chatId } = useParams();
    const {
        setMessage,
        setOnline,
        category,
        setDeleteChat,
        deleteChat,
        online,
    } = useChat();
    const {
        setToasterMessage,
        setShowToaster,
        setRoomName,
        setRoomsList,
        chatOpen,
        setWs,
        ws,
        setSavedChats,
    } = useChat();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    function handleMessages(e: MessageEvent) {
        const msgData = JSON.parse(e.data);
        if (msgData.event_type === "chat_message") {
            setMessage((prevState) => [...prevState, msgData.message]);
        } else if (msgData.event_type === "online_user_list") {
            setOnline(msgData.user_list);
        } else if (msgData.event_type === "message_was_deleted") {
            setMessage((prevMessages) =>
                prevMessages.map((prevMessage) =>
                    prevMessage.id === msgData.id
                        ? { ...prevMessage, is_deleted: true }
                        : prevMessage
                )
            );
        } else if (msgData.event_type === "message_was_updated") {
            setMessage((prevMessages) =>
                prevMessages.map((prevMessage) =>
                    prevMessage.id === msgData.id
                        ? { ...prevMessage, text: msgData.new_text }
                        : prevMessage
                )
            );
        } else if (msgData.event_type === "chat_was_deleted") {
            setDeleteChat((prevState) => ({ ...prevState, delete: true }));
            setRoomsList((prevState) =>
                prevState?.filter((room) => room.id !== msgData.id)
            );
        } else if (msgData.event_type === "connected_user") {
            setOnline((prevState) => [...prevState, msgData.user]);
            console.log(online);
        } else if (msgData.event_type === "disconnected_user") {
            setOnline((prevState) =>
                prevState.filter((user) => user.id !== msgData.user.id)
            );
        } else if (msgData.event_type === "message_reaction_was_posted") {
            setMessage((prevState) =>
                prevState.map((message) => {
                    if (message.id === msgData.id) {
                        message.reactions?.push(msgData);
                    }
                    return message;
                })
            );
        } else if (msgData.event_type === "message_reaction_was_deleted") {
            setMessage((prevState) =>
                prevState.map((message) => {
                    if (message.id === msgData.id && message.reactions) {
                        const userReactionIndex = message.reactions.findIndex(
                            (reaction) =>
                                reaction.user_name === msgData.user ||
                                reaction.user === msgData.user
                        );

                        if (userReactionIndex !== -1) {
                            message.reactions.splice(userReactionIndex, 1);

                            return {
                                ...message,
                                reactions: [...message.reactions],
                            };
                        }
                    }
                    return message;
                })
            );
        } else if (msgData.event_type === "chat_was_liked") {
            setRoomsList((prevRoomList) => {
                return prevRoomList?.map((chat) => {
                    if (chat.id === Number(msgData.id)) {
                        return { ...chat, likes: chat.likes + 1 };
                    }
                    return chat;
                });
            });
        } else if (msgData.event_type === "chat_was_unliked") {
            setRoomsList((prevRoomList) => {
                return prevRoomList?.map((chat) => {
                    if (chat.id === Number(msgData.id)) {
                        return { ...chat, likes: chat.likes - 1 };
                    }
                    return chat;
                });
            });
        } else {
            setToasterMessage([msgData.error_message]);
            setShowToaster(true);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        const getAllChatsRoom = async () => {
            const data = await getChatsRoom(room, category);
            setRoomsList(data.results);
        };
        getAllChatsRoom();
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 871);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        if (chatId) {
            if (ws) {
                ws?.close();
            }
            const wss = new WebSocket(socketUrl(room, chatId));
            setWs(wss);
            const getMessagesandSavedChats = async () => {
                const messages = await getAllMessages(Number(chatId));
                const savedChats = await getSavedChats(room);
                setMessage(messages.results);
                setSavedChats(savedChats.results);
            };
            wss.addEventListener("message", handleMessages);
            getMessagesandSavedChats();
        }
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        chatId,
        chatOpen,
        room,
        category,
        setMessage,
        setRoomsList,
        setWs,
        setSavedChats,
    ]);
    return (
        <>
            {isSmallScreen ? (
                <div className={styles.container__chatInformation}>
                    {chatId ? (
                        <ChatGroup isSmallScreen={isSmallScreen} />
                    ) : (
                        <div>
                            {deleteChat.delete ? (
                                <DeleteChat isSmallScreen={isSmallScreen} />
                            ) : (
                                <Welcome isSmallScreen={isSmallScreen} />
                            )}
                            <PanelGroups />
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.container__chatInformation}>
                    <PanelGroups />
                    <ChatGroup />
                </div>
            )}
            <Footer />
        </>
    );
}
