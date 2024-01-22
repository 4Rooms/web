import React from "react";
import styles from "./BlockNotificationSaved.module.css";
import { formatTime } from "../../utils/formatTime/formatTime";
import { Link } from "react-router-dom";
import { Like } from "../../assets/icons";

export default function BlockNotificationSaved({
    img = "",
    text = "",
    title = "",
    likes,
    time,
    room,
    id,
}: {
    img: string;
    text: string;
    title: string;
    likes: number;
    time: string;
    id?: number;
    room?: string;
    chat?: number | undefined;
}) {
    const url = `/chat/${room}/${id}`;
    return (
        <>
            <div className={styles.block}>
                <div className={styles.block__up}>
                    <img src={img} />
                    {room ? (
                        <Link to={url}>{title}</Link>
                    ) : (
                        <h2>{title}</h2>
                    )}
                </div>
                <p>{text}</p>
                <div className={styles.block__below}>
                    <span> {formatTime(time, "information")}</span>
                    <div>
                        <div>
                            {likes}
                            <Like />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
