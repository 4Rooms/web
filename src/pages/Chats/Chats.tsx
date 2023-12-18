import React, { useEffect, useState } from "react";
import styles from "./Chats.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";
import { useParams } from "react-router-dom";
import { useChat } from "../chats/chat-context/use-chat.tsx";
import { getAllMessages, getChatsRoom } from "../../services/chat/chat.service";
import Footer from "../../Components/Footer/Footer.tsx";
import Welcome from "./ChatGroup/Welcome/Welcome.tsx";

export default function Chats() {
    const { room } = useParams();
    const { chatId, setMessage, setOnline, category } = useChat();
    const { setRoomName, setRoomsList, chatOpen, setWs } = useChat();
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
        } else {
            console.log(msgData)
        }
        // } else if (msgData.event_type === "connected_user") {
        //     setOnline((prevState) => [...prevState, msgData.user]);
        // }
        // } else if (msgData.event_type === "disconnected_user") {
        //     setOnline((prevState) =>
        //         prevState.filter((user) => user !== msgData.user.id)
        //     );
        // }
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
            const ws = new WebSocket(socketUrl);
            setWs(ws);
            const getMessages = async () => {
                const messages = await getAllMessages(chatId);
                setMessage(messages.results);
                console.log(messages.results);
            };
            ws.addEventListener("message", handleMessages);
            getMessages();
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
    ]);
    return (
        <>
            {isSmallScreen ? (
                <div className={styles.container__chatInformation}>
                    {chatOpen ? (
                        <ChatGroup isSmallScreen={isSmallScreen} />
                    ) : (
                        <div>
                            <Welcome isSmallScreen={isSmallScreen} />
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
