import React, { useState } from "react";
import styles from "./BasedNotificationSaved.module.css";
import { optionDashboard } from "../../utils/optionDashboard";
import { MoreInformation, SearchRooms } from "../../assets/icons";
import { getCreateChat, getSavedChats } from "../../services/chat/chat.service";
import { useChat } from "../../pages/chats/chat-context/use-chat";
import { useTranslation } from "react-i18next";

type Props = {
    children: React.ReactNode;
    title: string;
};

type OpenSectionType = {
    [key: string]: boolean;
};

export default function BasedNotificationSaved({ children, title }: Props) {
    const {
        setFilterCreate,
        setCreateChat,
        setFilterSaved,
        createChat,
        savedChats,
        setSavedChats,
    } = useChat();
    const [openSection, setOpenSection] = useState<OpenSectionType>({
        cinema: false,
        books: false,
        games: false,
        music: false,
    });
    const { t } = useTranslation("translation");

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
                                <p>{t(`dashboard.${option.name.toLowerCase()}`)}</p>
                                <button
                                    onClick={async () => {
                                        setOpenSection((prevState) => {
                                            const updatedState = Object.keys(prevState).reduce((acc: OpenSectionType, key) => {
                                                acc[key] = false;
                                                return acc;
                                            }, {});
                                        
                                            return {
                                                ...updatedState,
                                                [option.name.toLocaleLowerCase()]: !prevState[option.name.toLocaleLowerCase()],
                                            };
                                        });
                                        
                                        if (title === "My Chats") {
                                            const chats = await getCreateChat(
                                                option.name.toLocaleLowerCase()
                                            );
                                            setFilterCreate(chats.results);
                                            setCreateChat(chats.results);
                                        } else {
                                            const chats = await getSavedChats(
                                                option.name.toLocaleLowerCase()
                                            );
                                            setSavedChats(chats.results);
                                            setFilterSaved(chats.results);
                                        }
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
                                                placeholder={t('shared.search')}
                                                className={
                                                    styles.navigation__input
                                                }
                                                onChange={(e) => {
                                                    if (createChat && title === "My Chats") {
                                                        setFilterCreate(
                                                            createChat?.filter(
                                                                (room) =>
                                                                    room.title.includes(
                                                                        e.target
                                                                            .value
                                                                    )
                                                            )
                                                        );
                                                    } else {
                                                        setFilterSaved(
                                                            savedChats?.filter(
                                                                (room) =>
                                                                    room.title.includes(
                                                                        e.target
                                                                            .value
                                                                    )
                                                            )
                                                        );
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
