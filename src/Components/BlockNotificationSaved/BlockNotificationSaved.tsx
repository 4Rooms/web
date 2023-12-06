import React from "react";
import styles from "./BlockNotificationSaved.module.css";
import { Like, Message, SavedChats } from "../../assets/icons";

export default function BlockNotificationSaved() {
    return (
        <div className={styles.block}>
            <div className={styles.block__up}>
                <img src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true" />
                <h2>Title</h2>
            </div>
            <p>
                What are your impressions of the series "Game of Thrones"? Do
                you recommend watching with children?
            </p>
            <div className={styles.block__below}>
                <span>18.08.2023</span>
                <div>
                    <div>
                        321
                        <Message />
                    </div>
                    <div>
                        321
                        <Like />
                    </div>
                    <div>
                        321
                        <SavedChats />
                    </div>
                </div>
            </div>
        </div>
    );
}
