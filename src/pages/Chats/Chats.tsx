import React, { useEffect, useState } from "react";
import styles from "./Chats.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";
import { useParams } from "react-router-dom";
import { useChat } from "../chats/chat-context/use-chat.tsx";
import { getChatsRoom } from "../../services/chat/chat.service";
import Footer from "../../Components/Footer/Footer.tsx";
import Welcome from "./ChatGroup/Welcome/Welcome.tsx";

export default function Chats() {
    const { room } = useParams();
    const { setRoomName, setRoomsList, chatOpen } = useChat();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
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
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [room, setRoomsList]);
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
