import React from "react";
import { AddFile, SendMessage, Smile } from "../../../../assets/icons";
import styles from "./MessageForm.module.css";

export default function MessageForm() {
    return (
        <form className={styles.form__message}>
            <div className={styles.wrapper__icon}>
                <button type="button" className={styles.button__message}>
                    <Smile />
                </button>
                <button type="button" className={styles.button__message}>
                    <AddFile />
                </button>
            </div>
            <input
                className={styles.input__message}
                placeholder="Type something..."
                type="text"
            />
            <button type="button" className={styles.button__message}>
                    <SendMessage />
            </button>
        </form>
    );
}
