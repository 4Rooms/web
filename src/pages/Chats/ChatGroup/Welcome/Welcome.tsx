import React from "react";
import styles from './Welcome.module.css';

export default function Welcome() {
    return (
        <div className={styles.wrapper__welcome}>
            <h1 className={styles.title__welcome}>
                Welcome to the Cinema room!
            </h1>
            <p className={styles.text__welcome}>
                Choose any chat from the list on the left and start chatting. If
                you haven't found an interesting chat, create a new one using
                the <span className={styles.span__welcome}>"Create chat"</span>
                button.
            </p>
        </div>
    );
}
