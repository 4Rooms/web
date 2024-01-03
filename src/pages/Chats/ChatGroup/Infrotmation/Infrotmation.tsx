import React, { useState } from "react";
import styles from "./Infrotmation.module.css";
import {
    Back,
    Delete,
    Favorite,
    MoreInformation,
    Saved,
    SavedChatsTrue,
} from "../../../../assets/icons";
import Modal from "../../../../Components/Modal/Modal";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import Button from "../../../../shared/button/button.tsx";
import { useAuth } from "../../../auth/signup-page/auth-context/use-auth.tsx";
import {
    deleteSavedChat,
    postSavedChat,
} from "../../../../services/chat/chat.service.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { cutTextFunction } from "../../../../utils/cutTextFuncion/cutTextFunction.tsx";

interface InfrotmationProps {
    title: string;
    description: string | undefined;
    timestamp: string | undefined;
    avatar: string | undefined;
    isSmallScreen: boolean | undefined;
    user: string | undefined;
    likes: number | undefined;
}

export default function Infrotmation({
    title,
    description,
    timestamp,
    avatar,
    isSmallScreen,
    user,
    likes,
}: InfrotmationProps) {
    const { room, chatId } = useParams();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const { ws, setDeleteChat, savedChats, setSavedChats } =
        useChat();
    const { username } = useAuth();
    function formatDate(inputDate: string | undefined): string {
        if (!inputDate) {
            return "";
        }
        const date = new Date(inputDate);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}.${formattedMonth}.${year}`;
    }
    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
            return !prevOpen;
        });
    };
    const deleteChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const messageUser = {
                event_type: "chat_was_deleted",
            };
            ws?.send(JSON.stringify(messageUser));
            navigate(`/chat/${room}`);
            setDeleteChat({ delete: true, name: title });
        } catch (error) {
            console.log(error);
        }
    };
    const clickLike = () => {
        const messageUser = {
            event_type: "chat_was_liked/unliked",
        };
        ws?.send(JSON.stringify(messageUser));
    };
    const submitSavedChat = async () => {
        const chatTets = savedChats.find(
            (item) => item.chat === Number(chatId)
        );
        if (chatTets) {
            await deleteSavedChat(chatTets.id);
            setSavedChats((prevState) =>
                prevState.filter((item) => item.chat !== Number(chatId))
            );
        } else {
            const { saved_chat } = await postSavedChat(Number(chatId));
            setSavedChats((prevState) => [...prevState, { ...saved_chat }]);
        }
    };
    return (
        <>
            <div className={styles.container__information}>
                <div className={styles.group}>
                    {isSmallScreen && (
                        <button
                            onClick={() => {
                                navigate(`/chat/${room}`)
                                setDeleteChat({
                                    name: "",
                                    delete: false,
                                });
                            }}
                        >
                            <Back />
                        </button>
                    )}
                    <img className={styles.group__avatar} src={avatar} />
                    <p className={styles.group__name}>
                        {cutTextFunction(title, "information", isSmallScreen)}
                    </p>
                    <button
                        onClick={onClickChangeOpenModal}
                        className={styles.group__button__more}
                    >
                        <MoreInformation />
                    </button>
                </div>
            </div>
            {openModal && (
                <Modal className="information" onOpen={onClickChangeOpenModal}>
                    <>
                        <div className={styles.group__modal}>
                            <img
                                className={styles.group__avatar__modal}
                                src={avatar}
                            />
                            <p className={styles.group__name__modal}>
                                {cutTextFunction(title, "information", isSmallScreen)}
                            </p>
                        </div>
                        <div className={styles.wrapper}>
                            <p
                                style={{ marginBottom: 20 }}
                                className={styles.group__text}
                            >
                                {description}
                            </p>
                            <div className={styles.group__additional}>
                                <p className={styles.time__additional}>
                                    {formatDate(timestamp)}
                                </p>
                                <div className={styles.container__button}>
                                    <button
                                        onClick={clickLike}
                                        className={styles.button__additional}
                                    >
                                        {likes}
                                        <Favorite />
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.button__additional}`}
                                        onClick={submitSavedChat}
                                    >
                                        {savedChats.find(
                                            (item) =>
                                                item.chat === Number(chatId)
                                        ) ? (
                                            <SavedChatsTrue />
                                        ) : (
                                            <Saved />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {username === user && (
                            <button
                                onClick={() => {
                                    setOpenModalDelete(true);
                                }}
                                className={styles.delete__chat}
                            >
                                <Delete />
                                Delete chat
                            </button>
                        )}
                        {openModalDelete && (
                            <Modal
                                className="delete"
                                onOpen={() => {
                                    setOpenModalDelete(!openModalDelete);
                                    setOpenModal(true);
                                }}
                            >
                                <form
                                    onSubmit={(e) => deleteChatSubmit(e)}
                                    className={styles.wrapper__modal_delete}
                                >
                                    <h2>Delete your chat</h2>
                                    <p>
                                        Are you sure you want to delete{" "}
                                        <b>“{cutTextFunction(title, "information", isSmallScreen)}”</b> chat?
                                        After this action, recovery will be
                                        impossible.
                                    </p>
                                    <Button type="submit" className="accent">
                                        Delete
                                    </Button>
                                </form>
                            </Modal>
                        )}
                    </>
                </Modal>
            )}
        </>
    );
}
