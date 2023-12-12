import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { SavedChatsTrue } from "../../assets/icons";
import styles from './Saved.module.css';

export default function Saved() {
    return (
        <BasedNotificationSaved title="Saved Chats">
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
