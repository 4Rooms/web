import React, { useState } from "react";
import styles from "./Infrotmation.module.css";
import {
    Back,
    Favorite,
    MoreInformation,
    Saved,
} from "../../../../assets/icons";
import Modal from "../../../../Components/Modal/Modal";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";

interface InfrotmationProps {
    title: string | undefined;
    description: string | undefined;
    timestamp: string | undefined;
    avatar: string | undefined;
    isSmallScreen: boolean | undefined;
}

export default function Infrotmation({
    title,
    description,
    timestamp,
    avatar,
    isSmallScreen,
}: InfrotmationProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { setChatOpen } = useChat();
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
                    <p className={styles.group__name}>{title}</p>
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
                            <p className={styles.group__name__modal}>{title}</p>
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
                    </>
                </Modal>
            )}
        </>
    );
}
