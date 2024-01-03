import React, { useState } from "react";
import styles from "../Message.module.scss";
import { useAuth } from "../../../../../auth/signup-page/auth-context/use-auth.tsx";
import { Delete, Edit } from "../../../../../../assets/icons.tsx";
import { useChat } from "../../../../chat-context/use-chat.tsx";
import { countBy } from "lodash";
import { Message } from "../../../../../../App.types.ts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { emojisResponse } from "../../../../../../utils/arrays/arrays.tsx";
import { formatTime } from "../../../../../../utils/formatTime/formatTime.tsx";

export default function MessageForYou({ message }: { message: Message }) {
    const { room } = useParams();
    const { username } = useAuth();
    const { ws, setUpdate } = useChat();
    const [open, setOpen] = useState(false);
    const uniqueReactions = countBy(message.reactions, "reaction");
    const openMenuMessage = () => {
        setOpen((prevState) => !prevState);
    };
    const deleteMessageUser = () => {
        const messageUser = {
            event_type: "message_was_deleted",
            id: message.id,
        };
        ws?.send(JSON.stringify(messageUser));
    };
    const clickReaction = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const target = e.target as HTMLElement;
        const reaction = target.textContent?.split(" ")[0];
        const messageUser = {
            event_type: "message_reaction",
            id: message.id,
            reaction,
        };
        ws?.send(JSON.stringify(messageUser));
        setOpen(false);
        e.stopPropagation();
    };
    const getPhotoClassName = (attachmentsLength: number) => {
        if (attachmentsLength === 3) {
            return `${styles.message__photo} ${styles.three__child}`;
        }
        return styles.message__photo;
    };
    const { t } = useTranslation("translation");

    return (
        <li
            key={message.id}
            className={`${styles.message__container} ${
                message.user_name === username && styles.from
            }`}
        >
            {message.user_name !== username && (
                <img
                    className={styles.user__avatar}
                    src={message.user_avatar}
                />
            )}
            <div
                onClick={openMenuMessage}
                className={`${styles.wrapper__message}  ${
                    message.is_deleted ? styles.deleted : ""
                }`}
            >
                <span
                    className={`${styles.message__user} ${
                        message.user_name === username && styles.from
                    } ${message.is_deleted ? styles.deleted : ""}`}
                >
                    <p
                        className={`${styles.user__name} ${
                            message.is_deleted ? styles.gray : ""
                        }`}
                    >
                        {message.user_name}
                    </p>
                    {!message.is_deleted && message.attachments.length > 0 && (
                        <div className={styles.message__photos}>
                            {message.attachments?.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    className={getPhotoClassName(
                                        message.attachments.length
                                    )}
                                    alt={`Photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    <p className={styles.user__text}>
                        {message.is_deleted ? (
                            <>
                                <Delete /> {t("menu-modal.was deleted")}
                            </>
                        ) : (
                            message.text
                        )}
                    </p>

                    <p className={styles.user__time}>
                        {formatTime(message.timestamp)}
                    </p>
                    {!message.is_deleted && (
                        <ul className={styles.list__reactions}>
                            {Object.keys(uniqueReactions).map((reaction) => {
                                return (
                                    <li key={reaction}>
                                        <button
                                            onClick={(e) => clickReaction(e)}
                                            type="button"
                                            className={room ? styles[room] : ""}
                                        >
                                            {reaction}{" "}
                                            <span>
                                                {uniqueReactions[reaction]}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {open && !message.is_deleted && (
                        <div
                            className={`${styles.menu__message} ${
                                message.text.length > 50 && styles.more
                            }`}
                        >
                            {username === message.user_name && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUpdate({
                                                edit: true,
                                                text: message.text,
                                                id: message.id,
                                            });
                                        }}
                                    >
                                        <Edit /> {t("menu-modal.edit")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            deleteMessageUser();
                                        }}
                                    >
                                        <Delete /> {t("menu-modal.delete")}
                                    </button>
                                </>
                            )}

                            {message.reactions?.find(
                                (reaction) => reaction.user_name === username
                            ) ||
                            message.reactions?.find(
                                (reaction) =>
                                    reaction.user.toString() === username
                            ) ? (
                                <></>
                            ) : (
                                <ul className={styles.reaction}>
                                    {emojisResponse.map((response) => {
                                        return (
                                            <li key={response}>
                                                <button
                                                    onClick={(e) =>
                                                        clickReaction(e)
                                                    }
                                                    type="button"
                                                >
                                                    {response}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                </span>
            </div>
        </li>
    );
}
