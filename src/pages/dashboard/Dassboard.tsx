import React from "react";
import styles from "./Dashboard.module.css";
import { optionDashboard } from "../../utils/optionDashboard";
import { Link } from "react-router-dom";

export function DashboardPage() {
    return (
        <div className={styles.overlay}>
            <div>
                <h1 className={styles.title__dashboard}>
                    Choose a room for chatting
                </h1>
                <ul className={styles.list__dashboard}>
                    {optionDashboard.map((option) => {
                        return (
                            <li
                                style={{ backgroundColor: option.background }}
                                className={styles.item__dashboard}
                            >
                                <Link
                                    to={option.name}
                                    style={{ width: "100%" }}
                                    className={styles.item__dashboard}
                                >
                                    <p className={styles.text__dashboard}>
                                        {option.name}
                                    </p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
