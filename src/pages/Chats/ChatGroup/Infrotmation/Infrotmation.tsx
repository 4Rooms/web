import React, { useEffect, useState } from "react";
import styles from "./Infrotmation.module.css";
import {
    CloseModal,
    Favorite,
    MoreInformation,
    Saved,
} from "../../../../assets/icons";
import { createPortal } from "react-dom";

const modalRoot: null | Element = document.querySelector(
    "#modal-root"
);

export default function Infrotmation() {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleKeyDown = (e: any) => {
        if (e.code === "Escape") {
            onClickChangeOpenModal();
        }
    };

    const handleBackdropClick = (event: any) => {
        if (event.target === event.currentTarget) {
            onClickChangeOpenModal();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
            return !prevOpen;
        });
        console.log(modalRoot);
    };
    return (
        <>
            <div className={styles.container__information}>
                <div className={styles.group}>
                    <img
                        className={styles.group__avatar}
                        src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                    />
                    <p className={styles.group__name}>Spanch Bob</p>
                    <button
                        onClick={onClickChangeOpenModal}
                        className={styles.group__button__more}
                    >
                        <MoreInformation />
                    </button>
                </div>
            </div>
            {openModal &&
                createPortal(
                    <div
                        onClick={handleBackdropClick}
                        className={styles.overlay__modal}
                    >
                        <div className={styles.widnow__mondal} style={{padding: "40px 32px"}}>
                            <div className={styles.group__modal}>
                                <img
                                    className={styles.group__avatar__modal}
                                    src="https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7&gen=ntrn&legacyStatusCode=true"
                                />
                                <p className={styles.group__name__modal}>Spanch Bob</p>
                            </div>
                            <button
                                className={styles.close__modal}
                                onClick={onClickChangeOpenModal}
                            >
                                <CloseModal />
                            </button>
                            <p style={{marginBottom: 20}} className={styles.group__text}>
                                What are your impressions of the series "Game of
                                Thrones"? Do you recommend watching with
                                children?
                            </p>
                            <div className={styles.group__additional}>
                                <p className={styles.time__additional}>
                                    18.08.2023
                                </p>
                                <div className={styles.container__button}>
                                    <button
                                        className={styles.button__additional}
                                    >
                                        <Favorite />
                                    </button>
                                    <button
                                        className={styles.button__additional}
                                    >
                                        <Saved />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    modalRoot as Element
                )}
        </>
    );
}
