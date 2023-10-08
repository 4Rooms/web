import React from "react";
import styles from "./Online.module.css";

export default function Online() {
    const users: string[] = ["Masha", "Masha", "Masha", "Masha", "Masha", "Masha", "Masha", "Masha", "Masha", "Masha", "Masha",];
    return (
        <div className={styles.container__online}>
            <p className={styles.online__text}>Online now:</p>
            <ul className={styles.online__list}>
                {users.map((_, index) => {
                    return (
                        <li key={index}>
                    <img
                        className={styles.online__avatar}
                        src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                    />
                </li>
                    )
                })}
            </ul>
            <button type="button" className={styles.online__button}>....and 96 others</button>
        </div>
    );
}
