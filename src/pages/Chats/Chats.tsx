import React, { useEffect } from "react";
import styles from "./Chats.module.css";
import styles__logo from "./../../Components/Navigation/Navigation.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";
import { Link, useParams } from "react-router-dom";
import { Logo } from "../../assets/icons";
import { getChatsRoom } from "../../services/chat/chat.service";
import { useChat } from "../chats/chat-context/use-chat.tsx";

export default function Chats() {
    const { room } = useParams();
    const { setRoomName } = useChat();
    setRoomName(room);
    useEffect(() => {
        const getAllChatsRoom = async () => {
            try {
                const data = await getChatsRoom(room);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllChatsRoom();
    }, [room]);
    return (
        <>
            <div className={styles.container__chatInformation}>
                <PanelGroups />
                <ChatGroup />
            </div>
            <div className={styles.chats__footer}>
                <div>
                    <Link to="/" className={styles.link__logo}>
                        <Logo className={styles.footer__icon} />
                        <div>
                            <span className={styles__logo.logo__name}>
                                4ROOMS
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
