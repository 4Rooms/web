import React from "react";
import styles from "../Message.module.scss";

export default function MessageFromYou() {
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div className={styles.message__container} style={{ justifyContent: "right" }}>
            <div
                className={styles.message__user}
            >
                <p className={styles.user__name} style={{ color: getRandomColor() }}>Miki Spoul</p>
                <p className={styles.user__text}>
                    Well, Sophie Turner, who plays Sansa Stark, adopted Zunni,
                    the Northern Inuit dog that played her pet direwolf on the
                    series’ first season.
                </p>
                <p className={styles.user__time}>13:43</p>
            </div>
        </div>
    );
}
