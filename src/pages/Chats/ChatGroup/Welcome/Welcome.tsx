import React from "react";
import styles from "./Welcome.module.css";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import { Trans, useTranslation } from "react-i18next";
import { RowUp } from "../../../../assets/icons.tsx";

interface ProfileContextType {
    isSmallScreen?: boolean;
}

export default function Welcome({isSmallScreen}: ProfileContextType) {
    const { t } = useTranslation('translation', { keyPrefix: 'welcome' });

    const { roomName } = useChat();
    return (
        <div className={`${styles.welcome}  ${roomName ? styles[roomName] : ""}`}>
            <h1 className={styles.welcome__title}>
                {t('welcome')} {t(String(roomName))} {t('room')}
            </h1>
            <p className={styles.welcome__text}>
                <Trans i18nKey="welcome.message">
                    Choose any chat from the list on the left and start chatting. If
                    you haven't found an interesting chat, create a new one using
                    the <span className={styles.welcome__span}>Create chat</span>{" "}
                    button.
                </Trans>
            </p>
            {isSmallScreen && (
                <div>
                    <RowUp />
                    <span>Scroll and go to chats</span>
                </div>
            )}
        </div>
    );
}
