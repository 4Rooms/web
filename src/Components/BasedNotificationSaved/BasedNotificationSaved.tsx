import React, { useState } from "react";
import styles from "./BasedNotificationSaved.module.css";
import { optionDashboard } from "../../utils/optionDashboard";
import { MoreInformation, SearchRooms } from "../../assets/icons";
import { getCreateChat } from "../../services/chat/chat.service";
import { useChat } from "../../pages/chats/chat-context/use-chat";

type Props = {
    children: React.ReactNode;
    title: string;
};

type OpenSectionType = {
    [key: string]: boolean;
};

export default function BasedNotificationSaved({ children, title }: Props) {
    const { setFilterCreate, setCreateChat , createChat } = useChat();
    const [openSection, setOpenSection] = useState<OpenSectionType>({
        cinema: false,
        books: false,
        games: false,
        music: false,
    });

    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <div className={styles.container__wrapper}>
                {optionDashboard.map((option) => {
                    return (
                        <>
                            <div
                                key={option.name}
                                className={`${
                                    styles.container__wrapper_block
                                } ${styles[option.name.toLocaleLowerCase()]}
                                ${
                                    openSection[option.name.toLocaleLowerCase()]
                                        ? styles.active
                                        : ""
                                } 
                                `}
                            >
                                <p>{option.name}</p>
                                <button
                                    onClick={async () => {
                                        setOpenSection((prevState) => ({
                                            ...prevState,
                                            [option.name.toLocaleLowerCase()]:
                                                !prevState[
                                                    option.name.toLocaleLowerCase()
                                                ],
                                        }));
                                        const chats = await getCreateChat(option.name.toLocaleLowerCase());
                                        setFilterCreate(chats.results)
                                        setCreateChat(chats.results);
                                    }}
                                >
                                    <MoreInformation />
                                </button>
                                {openSection[
                                    option.name.toLocaleLowerCase()
                                ] && (
                                    <div
                                        className={`${
                                            styles.container__wrapper_chats
                                        } ${
                                            styles[
                                                option.name.toLocaleLowerCase()
                                            ]
                                        }`}
                                    >
                                        <label>
                                            <input
                                                placeholder="Search"
                                                className={
                                                    styles.navigation__input
                                                }
                                                onChange={(e) => {
                                                    if (createChat) {
                                                        setFilterCreate(createChat?.filter((room) => room.title.includes(e.target.value)))
                                                    }
                                                }}
                                                type="text"
                                            />
                                            <button type="button">
                                                <SearchRooms />
                                            </button>
                                        </label>
                                        <ul>{children}</ul>
                                    </div>
                                )}
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
