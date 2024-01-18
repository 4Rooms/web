import React from "react";
import styles from "./Groups.module.scss";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { cutTextFunction } from "../../../../utils/cutTextFuncion/cutTextFunction.tsx";

export default function Groups() {
    const {chatId} = useParams();
    const {room} = useParams();
    const { roomsList, setChatOpen, setChatId, setDeleteChat, setMessage } =
        useChat();
        const navigate = useNavigate();
    const onClickSetChat = (id: number) => {
        setChatOpen(true);
        setChatId(id);
        setMessage([]);
        setDeleteChat({
            name: "",
            delete: false,
        });
    };
    console.log(roomsList)
    return (
        <ul className={styles.container__groups}>
            {roomsList?.map((group) => {
                return (
                    <li className={styles.item__group} key={group.id}>
                        <button
                            type="button"
                            className={`${styles.group} ${
                                room ? styles[room] : ""
                            }`}
                            onClick={() => {
                                onClickSetChat(group.id);
                                navigate(`/chat/${room}/${group.id.toString()}`);
                            }}
                        >
                            <img
                                className={styles.group__avatar}
                                src={group.img}
                                alt=""
                            />
                            <p
                                className={`${styles.group__text} ${
                                    group.id === Number(chatId) &&
                                    room &&
                                    styles[room]
                                }`}
                            >
                                {cutTextFunction(group.title, "groups")}
                            </p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
