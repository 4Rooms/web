import React from "react";
import { AddFile, Smile } from "../../../../assets/icons";
import styles from "./MessageForm.module.css";

export default function MessageForm() {
    return (
        <form className={styles.form__message}>
            <input
                className={styles.input__message}
                placeholder="Type something..."
                type="text"
            />
            <button type="button" className={styles.button__message}>
                <Smile />
            </button>
            <button type="button" className={styles.button__message}>
                <AddFile />
            </button>
        </form>
    );
}
