import React from "react";
import styles from "./Groups.module.css";

export default function Groups() {
    const groups: string[] = ["SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob", "SpanchBob"];
    return (
        <ul className={styles.container__groups}>
            {groups.map((group) => {
                return (
                    <li className={styles.item__group}>
                        <button type="button" className={styles.group}>
                            <img
                                className={styles.group__avatar}
                                src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                                alt=""
                            />
                            <p className={styles.group__text}>{group}</p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
