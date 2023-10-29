import React from "react";
import styles from "./Switch.module.css";

type SwitchProps = {
    value: string;
    selectedOption: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


export default function Switch({
    value,
    selectedOption,
    handleChange,
}: SwitchProps) {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                value={value}
                className={styles.switch__input}
                checked={selectedOption === value}
                onChange={handleChange}
            />
            <span className={styles.switch__slider}></span>
        </label>
    );
}
