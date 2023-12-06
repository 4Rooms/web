import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { Edit } from "../../assets/icons";
import styles from "./MyChats.module.css";

export default function MyChats() {
    return (
        <BasedNotificationSaved title="My Chats">
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
            <li className={styles.item}>
                <BlockNotificationSaved />
                <button>
                    <Edit />
                </button>
            </li>
        </BasedNotificationSaved>
    );
}
