import React from "react";
import styles from "./BlockNotificationSaved.module.css";
import { Like } from "../../assets/icons";

export default function BlockNotificationSaved({img="", text="", title="", likes, time}: {img: string, text: string, title: string, likes: number, time: string}) {
    const cutTextFunction = (text: string) => {
        let modifiedText = "";

        if (text?.length > 15) {
            modifiedText = text.substring(0, 10);
        } else {
            modifiedText = text;
        }
        return modifiedText;
    };
    return (
        <div className={styles.block}>
            <div className={styles.block__up}>
                <img src={img} />
                <h2>{title}</h2>
            </div>
            <p>
                {text}
            </p>
            <div className={styles.block__below}>
                <span>{cutTextFunction(time)}</span>
                <div>
                    <div>
                        {likes}
                        <Like />
                    </div>
                </div>
            </div>
        </div>
    );
}
