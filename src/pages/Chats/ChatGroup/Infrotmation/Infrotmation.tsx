import React from "react";
import styles from "./Infrotmation.module.css";
import { Favorite, Saved } from "../../../../assets/icons";

export default function Infrotmation() {
    return (
        <div className={styles.container__information}>
            <div className={styles.group}>
                <img
                    className={styles.group__avatar}
                    src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                />
                <p className={styles.group__name}>Spanch Bob</p>
            </div>
            <p className={styles.group__text}>
                What are your impressions of the series "Game of Thrones"? Do
                you recommend watching with children?
            </p>
            <div className={styles.group__additional}>
                <p className={styles.time__additional}>18.08.2023</p>
                <div className={styles.container__button}>
                    <button className={styles.button__additional}>
                        <Favorite />
                    </button>
                    <button className={styles.button__additional}>
                        <Saved />
                    </button>
                </div>
            </div>
        </div>
    );
}
