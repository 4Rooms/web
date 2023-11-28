import React, { useState } from "react";
import styles from "./BasedNotificationSaved.module.css";
import { optionDashboard } from "../../utils/optionDashboard";
import { MoreInformation, SearchRooms } from "../../assets/icons";

type Props = {
    children: React.ReactNode;
};

type OpenSectionType = {
    [key: string]: boolean;
};

export default function BasedNotificationSaved({ children }: Props) {
    const [openSection, setOpenSection] = useState<OpenSectionType>({
        cinema: false,
        books: false,
        games: false,
        music: false,
    });

    return (
        <div className={styles.container}>
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
                                    onClick={() =>
                                        setOpenSection((prevState) => ({
                                            ...prevState,
                                            [option.name.toLocaleLowerCase()]:
                                                !prevState[
                                                    option.name.toLocaleLowerCase()
                                                ],
                                        }))
                                    }
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
                                                type="text"
                                            />
                                            <button
                                                type="button"
                                            >
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
