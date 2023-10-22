import React, { useState } from "react";
import styles from "./ChatGroup.module.css";
import Infrotmation from "./Infrotmation/Infrotmation";
import Online from "./Online/Online";
import Chat from "./Chat/Chat";
import MessageForm from "./MessageForm/MessageForm";
import Welcome from "./Welcome/Welcome";

export default function ChatGroup() {
    const [text] = useState<boolean>(true);
    return (
        <div className={styles.container__chatGroups}>
            {text ? (
                <Welcome/>
            ) : (
                <>
                    <Infrotmation />
                    <Online />
                    <Chat />
                    <MessageForm />
                </>
            )}
        </div>
    );
}
