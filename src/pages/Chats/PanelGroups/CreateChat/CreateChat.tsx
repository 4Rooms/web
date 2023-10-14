import React, { useState } from "react";
import styles from "./CreateChat.module.scss";
import Modal from "../../../../Components/Modal/Modal";
import { AddPhoto } from "../../../../assets/icons";
import Button from "../../../../shared/button/button";

export default function CreateChat() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const inputArray = ["fewfedww", "fewfew"];
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
            {openModal && (
                <Modal className="create__chat" onOpen={onClickChangeOpenModal}>
                    <>
                        <label className={styles.label__auth}>
                            <input className={styles.add__image} type="file" />
                            <AddPhoto />
                        </label>
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
                        <Button className="accent">Create</Button>
                    </>
                </Modal>
            )}
        </>
    );
}
