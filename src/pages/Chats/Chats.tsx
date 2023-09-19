import React from "react";
import styles from "./Chats.module.css";
import PanelGroups from "./PanelGroups/PanelGroups";
import ChatGroup from "./ChatGroup/ChatGroup";

export default function Chats() {
    return (
        <div className={styles.container__chatInformation}>
            <PanelGroups />
            <ChatGroup />
        </div>
    );
}
