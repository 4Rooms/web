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
    } = useChat();
    const {
        setToasterMessage,
        setShowToaster,
        setRoomsList,
        chatOpen,
        setWs,
        ws,
        setSavedChats,
    } = useChat();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    function updateMessagesWithNewMessage(prevState, newMessage) {
        return [...prevState, newMessage];
    }

    function updateMessagesWithDeletedFlag(prevMessages, id) {
        return prevMessages.map((message) =>
            message.id === id ? { ...message, is_deleted: true } : message
        );
    }

    function updateMessagesWithUpdatedText(prevMessages, id, newText) {
        return prevMessages.map((message) =>
            message.id === id ? { ...message, text: newText } : message
        );
    }

    function updateMessagesWithReaction(prevState, reactionData) {
        return prevState.map((message) => {
            if (message.id === reactionData.id) {
                message.reactions?.push(reactionData);
            }
            return message;
        });
    }

    function removeUserReaction(prevState, msgData) {
        return prevState.map((message) => {
            if (message.id === msgData.id && message.reactions) {
                const newReactions = message.reactions.filter(
                    (reaction) => reaction.user_name !== msgData.user && reaction.user !== msgData.user
                );
                return { ...message, reactions: newReactions };
            }
            return message;
        });
    }

    function updateChatLikes(prevRoomList, msgData, increment) {
        return prevRoomList?.map((chat) => {
            if (chat.id === Number(msgData.id)) {
                return { ...chat, likes: chat.likes + (increment ? 1 : -1) };
            }
            return chat;
        });
    }

    function handleMessages(e) {
        const msgData = JSON.parse(e.data);
        const eventHandlers = {
            "chat_message": () => setMessage(prev => updateMessagesWithNewMessage(prev, msgData.message)),
            "online_user_list": () => setOnline(msgData.user_list),
            "message_was_deleted": () => setMessage(prev => updateMessagesWithDeletedFlag(prev, msgData.id)),
            "message_was_updated": () => setMessage(prev => updateMessagesWithUpdatedText(prev, msgData.id, msgData.new_text)),
            "chat_was_deleted": () => {
                setDeleteChat(prev => ({ ...prev, delete: true }));
                // TODO fix this))
                setRoomsList(prev => prev?.filter(room => room.id !== msgData.id));
            },
            "connected_user": () => setOnline(prev => [...prev, msgData.user]),
            "disconnected_user": () => setOnline(prev => prev.filter(user => user.id !== msgData.user.id)),
            "message_reaction_was_posted": () => setMessage(prev => updateMessagesWithReaction(prev, msgData)),
            "message_reaction_was_deleted": () => setMessage(prev => removeUserReaction(prev, msgData)),
            "chat_was_liked": () => setRoomsList(prev => updateChatLikes(prev, msgData, true)),
            "chat_was_unliked": () => setRoomsList(prev => updateChatLikes(prev, msgData, false)),
            "default": () => {
                setToasterMessage([msgData.error_message]);
                setShowToaster(true);
            }
        };

        // Выполняем функцию обработки события, соответствующую типу события
        const handleEvent = eventHandlers[msgData.event_type] || eventHandlers['default'];
        handleEvent();
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
            const cookieString = document.cookie;
            if (ws) {
                ws?.close();
            }
            const wss = new WebSocket(socketUrl(room, chatId, cookieString));
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
                        <div className={styles.width}>
                            {deleteChat.delete ? (
                                <DeleteChat isSmallScreen={isSmallScreen} />
                            ) : (
                                <Welcome isSmallScreen={isSmallScreen} />
                            )}
                            <PanelGroups isSmallScreen={isSmallScreen} />
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
