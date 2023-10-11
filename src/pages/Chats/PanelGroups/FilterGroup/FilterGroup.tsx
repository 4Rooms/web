import React from "react";
import styles from "./FilterGroup.module.css";
import { RowBelow } from "../../../../assets/icons";

export default function FilterGroup() {
    const filterButton: string[] = ["Cinema", "Books", "Music", "Games"];
    return (
        <div>
            <ul className={styles.container__filterFroups}>
                {filterButton.map((text) => {
                    return (
                        <li key={text}>
                            <button
                                type="button"
                                className={styles.button__filter}
                            >
                                {text}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div style={{ position: "relative" }}>
                <button type="button" className={styles.button__new}>
                    New
                    <RowBelow />
                </button>
            </div>
        </div>
    );
}
