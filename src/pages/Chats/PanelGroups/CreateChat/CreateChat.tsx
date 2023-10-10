import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CreateChat.module.scss";
import { CloseModal } from "../../../../assets/icons";

const modalRoot: null | Element = document.querySelector("#modal-root");

export default function CreateChat() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const inputArray = ["fewfew", "fewfew"];
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
    };
    return (
        <>
            <button
                onClick={onClickChangeOpenModal}
                className={styles.button__addChat}
            >
                Create chat
            </button>
            {openModal &&
                createPortal(
                    <div
                        onClick={handleBackdropClick}
                        className={styles.overlay__modal}
                    >
                        <div
                            className={styles.widnow__mondal}
                            style={{ width: 686 }}
                        >
                            <button
                                className={styles.close__modal}
                                onClick={onClickChangeOpenModal}
                            >
                                <CloseModal />
                            </button>
                            <h1 className={styles.title__modal}>
                                Create a new chat
                            </h1>
                            <form className={styles.form__auth}>
                                {inputArray.map((value) => (
                                    <label
                                        className={styles.label__auth}
                                        key={value}
                                    >
                                        <input className={styles.input__auth} />
                                    </label>
                                ))}
                            </form>
                            <button className={styles.button__create}>
                                Create
                            </button>
                        </div>
                    </div>,
                    modalRoot as Element
                )}
        </>
    );
}
