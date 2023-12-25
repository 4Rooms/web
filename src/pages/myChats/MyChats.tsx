import React from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { Edit } from "../../assets/icons";
import styles from "./MyChats.module.css";
import { useTranslation } from "react-i18next";

export default function MyChats() {
    const { t } = useTranslation("translation");

    return (
        <BasedNotificationSaved title={t('my-chart.page-title')}>
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
