import React, { useState } from "react";
import styles from "./Infrotmation.module.css";
import {
    Back,
    Delete,
    Favorite,
    MoreInformation,
    Saved,
} from "../../../../assets/icons";
import Modal from "../../../../Components/Modal/Modal";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import Button from "../../../../shared/button/button.tsx";
import { deleteChat } from "../../../../services/chat/chat.service.tsx";

interface InfrotmationProps {
    title: string;
    description: string | undefined;
    timestamp: string | undefined;
    avatar: string | undefined;
    isSmallScreen: boolean | undefined;
    user: string | undefined;
}

export default function Infrotmation({
    title,
    description,
    timestamp,
    avatar,
    isSmallScreen,
    user,
}: InfrotmationProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const { setChatOpen, chatId } = useChat();
    const userName: {
        email: string;
        id: number;
        is_email_confirmed: boolean;
        username: string;
    } | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
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
    const cutTextFunction = (text: string) => {
        let modifiedText = "";

        if (text?.length > 15) {
            modifiedText = text.substring(0, 10) + "...";
        } else {
            modifiedText = text;
        }
        return modifiedText;
    };
    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
            return !prevOpen;
        });
    };
    const deleteChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await deleteChat(chatId);
            setChatOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className={styles.container__information}>
                <div className={styles.group}>
                    {isSmallScreen && (
                        <button onClick={() => setChatOpen(false)}>
                            <Back />
                        </button>
                    )}
                    <img className={styles.group__avatar} src={avatar} />
                    <p className={styles.group__name}>{cutTextFunction(title)}</p>
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
                            <p className={styles.group__name__modal}>{cutTextFunction(title)}</p>
                        </div>
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
                                <button className={styles.button__additional}>
                                    <Favorite />
                                </button>
                                <button className={styles.button__additional}>
                                    <Saved />
                                </button>
                            </div>
                        </div>
                        {userName?.username === user && (
                            <button
                                onClick={() => {
                                    setOpenModalDelete(true);
                                }}
                                className={styles.delete__chat}
                            >
                                <Delete />
                                fewfewfew
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
                                        <b>“{cutTextFunction(title)}”</b> chat? After this
                                        action, recovery will be impossible.
                                    </p>
                                    <Button type="submit" className="accent">
                                        fewfew
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
