import React, { useState } from "react";
import styles from "./BasedNotificationSaved.module.css";
import { MoreInformation, SearchRooms } from "../../assets/icons";
import { getCreateChat, getSavedChats } from "../../services/chat/chat.service";
import { useChat } from "../../pages/chats/chat-context/use-chat";
import { useTranslation } from "react-i18next";
import { optionDashboard } from "../../utils/arrays/arrays";
import { Result } from "../../App.types";

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

    const fetchData = async (
        name: string,
        setMain: (chats: Result) => void,
        setFilter: (chats: Result) => void,
        getData: (name: string) => Promise<{ results: Result }>
    ) => {
        setMain([]);
        setFilter([]);
        const chats = await getData(name.toLocaleLowerCase());
        setMain(chats.results);
        setFilter(chats.results);
    };

    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <div className={styles.container__wrapper}>
                {optionDashboard.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className={`${styles.container__wrapper_block} ${
                                styles[option.name.toLocaleLowerCase()]
                            }
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
                                        const updatedState = Object.keys(
                                            prevState
                                        ).reduce(
                                            (acc: OpenSectionType, key) => {
                                                acc[key] = false;
                                                return acc;
                                            },
                                            {}
                                        );

                                        return {
                                            ...updatedState,
                                            [option.name.toLocaleLowerCase()]:
                                                !prevState[
                                                    option.name.toLocaleLowerCase()
                                                ],
                                        };
                                    });

                                    if (title === "My Chats") {
                                        fetchData(
                                            option.name,
                                            setCreateChat,
                                            setFilterCreate,
                                            getCreateChat
                                        );
                                    } else {
                                        fetchData(
                                            option.name,
                                            setSavedChats,
                                            setFilterSaved,
                                            getSavedChats
                                        );
                                    }
                                }}
                            >
                                <MoreInformation />
                            </button>
                            {openSection[option.name.toLocaleLowerCase()] && (
                                <div
                                    className={`${
                                        styles.container__wrapper_chats
                                    } ${
                                        styles[option.name.toLocaleLowerCase()]
                                    }`}
                                >
                                    <label>
                                        <input
                                            placeholder={t("shared.search")}
                                            className={styles.navigation__input}
                                            onChange={(e) => {
                                                if (
                                                    createChat &&
                                                    title === "My Chats"
                                                ) {
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
                    );
                })}
            </div>
        </div>
    );
}
