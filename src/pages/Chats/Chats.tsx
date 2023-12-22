import React, { useEffect, useState } from "react";
import styles from "./Chats.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";
import { useParams } from "react-router-dom";
import { useChat } from "../chats/chat-context/use-chat.tsx";
import { getAllMessages, getChatsRoom, getSavedChats } from "../../services/chat/chat.service";
import Footer from "../../Components/Footer/Footer.tsx";
import Welcome from "./ChatGroup/Welcome/Welcome.tsx";
import DeleteChat from "./ChatGroup/DeleteChat/DeleteChat.tsx";

export default function Chats() {
    const { room } = useParams();
    const {
        chatId,
        setMessage,
        setOnline,
        category,
        setDeleteChat,
        deleteChat,
        online,
    } = useChat();
    const { setRoomName, setRoomsList, chatOpen, setWs, ws, setSavedChats } = useChat();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const cookieString = document.cookie;
    function extractToken(cookieString: string) {
        const pattern = /4roomToken=([^;]+)/;
        const match = cookieString.match(pattern);
        return match ? match[1] : null;
    }
    setRoomName(room);
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
                    if (message.id === msgData.id) {
                        if (
                            message.reactions?.find(
                                (reaction) =>
                                    reaction.user_name === msgData.user
                            ) ||
                            message.reactions?.find(
                                (reaction) => reaction.user === msgData.user
                            )
                        ) {
                            const objectReaction =
                                message.reactions?.find(
                                    (reaction) =>
                                        reaction.user_name === msgData.user
                                ) ||
                                message.reactions?.find(
                                    (reaction) => reaction.user === msgData.user
                                );
                            if (objectReaction) {
                                const indexObject =
                                    message.reactions?.indexOf(objectReaction);

                                if (
                                    indexObject !== undefined &&
                                    indexObject !== -1
                                ) {
                                    message.reactions.splice(
                                        indexObject,
                                        indexObject + 1
                                    );
                                    return {
                                        ...message,
                                        reactions: message.reactions,
                                    };
                                }
                            }
                        }
                    }
                    return message;
                })
            );
        } else {
            console.log(msgData);
        }
    }
    useEffect(() => {
        const getAllChatsRoom = async () => {
            try {
                const data = await getChatsRoom(room, category);
                setRoomsList(data.results);
            } catch (error) {
                console.log(error);
            }
        };
        getAllChatsRoom();
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 871);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        const socketUrl =
            "wss:" +
            "//back.4rooms.pro" +
            "/ws/chat/" +
            room +
            "/" +
            chatId +
            "/" +
            "?token=" +
            extractToken(cookieString);
        if (chatOpen) {
            if (ws) {
                console.log("disconnected");
                ws?.close();
            }
            const wss = new WebSocket(socketUrl);
            setWs(wss);
            const getMessagesandSavedChats = async () => {
                const messages = await getAllMessages(chatId);
                const savedChats = await getSavedChats();
                console.log(savedChats)
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
        cookieString,
        protocol,
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
                    {chatOpen ? (
                        <ChatGroup isSmallScreen={isSmallScreen} />
                    ) : (
                        <div>
                            {deleteChat.delete ? (
                                <DeleteChat />
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
