import React, { useEffect } from "react";
import styles from "./Chats.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";
import { useParams } from "react-router-dom";
import { useChat } from "../chats/chat-context/use-chat.tsx";
import { getChatsRoom } from "../../services/chat/chat.service";
import Footer from "../../Components/Footer/Footer.tsx";

export default function Chats() {
    const { room } = useParams();
    const { setRoomName, setRoomsList } = useChat();
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
    }, [room, setRoomsList]);
    return (
        <>
            <div className={styles.container__chatInformation}>
                <PanelGroups />
                <ChatGroup />
            </div>
            <Footer />
        </>
    );
}
