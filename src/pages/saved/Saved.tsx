import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { SavedChatsTrue } from "../../assets/icons";
import styles from './Saved.module.css';
import { useTranslation } from "react-i18next";

export default function Saved() {
    const { t } = useTranslation("translation");

    return (
        <BasedNotificationSaved title={t('saved-chats.page-title')}>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <SavedChatsTrue />
                </button>
            </li>
        </BasedNotificationSaved>
    );
}
