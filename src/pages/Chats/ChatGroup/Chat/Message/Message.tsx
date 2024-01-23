import React, { useState } from "react";
import styles from "./Message.module.scss";
import { useAuth } from "../../../../auth/signup-page/auth-context/use-auth.tsx";
import { Delete, Edit } from "../../../../../assets/icons.tsx";
import { countBy } from "lodash";
import { Message } from "../../../../../App.types.ts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { emojisResponse } from "../../../../../utils/arrays/arrays.tsx";
import { formatTime } from "../../../../../utils/formatTime/formatTime.tsx";
import { useChat } from "../../../../chats/chat-context/use-chat.tsx";
import Modal from "../../../../../Components/Modal/Modal.tsx";
import { localStorageService } from "../../../../../services/local-storage/local-storage.ts";

export default function Message({
    message,
    index,
}: {
    message: Message;
    index: number;
}) {
    const { room } = useParams();
    const { username } = useAuth();
    const { ws, setUpdate } = useChat();
    const [open, setOpen] = useState(false);
    const [openPhoto, setOpenPhoto] = useState({
        url: "",
        modal: false,
    });
    const user = localStorageService.get("user");
    const reactions =
        message.reactions?.find(
            (reaction) => reaction.user_name === username
        ) ||
        message.reactions?.find(
            (reaction) => reaction.user.toString() === username
        );
    const uniqueReactions = countBy(message.reactions, "reaction");
    const openMenuMessage = () => {
        setOpen((prevState) => !prevState);
    };
    const setOpenModalPhoto = () => {
        setOpenPhoto((prevState) => ({
            ...prevState,
            modal: !prevState.modal,
        }));
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
        } else if (attachmentsLength === 1) {
            return `${styles.message__photo} ${styles.one__child}`;
        }
        return styles.message__photo;
    };
    const { t } = useTranslation("translation");
    console.log(message)

    return (
        <li
            key={message.id}
            className={`${styles.message__container} ${
                message.user === user.id && styles.from
            }`}
        >
            {message.user !== user.id && (
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
                        message.user === user.id && styles.from
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
                        <ul className={styles.message__photos}>
                            {message.attachments?.map((photo, index) => (
                                <li
                                    key={index}
                                    className={getPhotoClassName(
                                        message.attachments.length
                                    )}
                                >
                                    <img
                                        src={photo}
                                        className={getPhotoClassName(
                                            message.attachments.length
                                        )}
                                        onClick={() =>
                                            setOpenPhoto({
                                                url: photo,
                                                modal: true,
                                            })
                                        }
                                        alt={`Photo ${index + 1}`}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <p className={styles.user__text}>
                        {message.is_deleted ? (
                            <>
                                <Delete /> {t("menu-modal.was-deleted")}
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
                    {open &&
                        !message.is_deleted &&
                        ((!reactions && username !== message.user_name) ||
                            username === message.user_name) && (
                            <div
                                className={`${styles.menu__message} ${
                                    message.text.length > 50 && styles.more
                                } ${
                                    username === message.user_name &&
                                    styles.another
                                } ${reactions && styles.reactions} ${
                                    index === 0 && styles.first
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

                                {!reactions && (
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
            {openPhoto.modal && (
                <Modal onOpen={setOpenModalPhoto} className="full__image">
                    <img src={openPhoto.url} />
                </Modal>
            )}
        </li>
    );
}
