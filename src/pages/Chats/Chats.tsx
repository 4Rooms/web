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
    const { chatId, setMessage } = useChat();
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
    useEffect(() => {
        const getAllChatsRoom = async () => {
            try {
                const data = await getChatsRoom(room);
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
                setMessage(messages);
            };
            getMessages();
        }
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [chatId, chatOpen, cookieString, protocol, room, setMessage, setRoomsList, setWs]);
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
