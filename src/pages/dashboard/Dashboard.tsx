import React from "react";
import styles from "./Dashboard.module.scss";
import { optionDashboard } from "../../utils/optionDashboard";
import { Link } from "react-router-dom";

export function DashboardPage() {
    return (
        <div className={styles.dashboard}>
                <h1 className={styles.dashboard__title}>
                    Choose a room for chatting
                </h1>
                <ul className={styles.dashboard__list}>
                    {optionDashboard.map((option) => {
                        return (
                            <li
                                className={`${styles.dashboard__item} ${styles[option.name.toLowerCase()]}`}
                                key={option.name}
                            >
                                <Link
                                    to={`/chat/${option.name.toLowerCase()}`}
                                    style={{ width: "100%" }}
                                    className={styles.dashboard__link}
                                >
                                    <div>
                                        <p className={styles.dashboard__text}>
                                            {option.name}
                                        </p>
                                        <p
                                            className={
                                                styles.dashboard__text_description
                                            }
                                        >
                                            You can chat about any movies or
                                            series you've already watched or
                                            plan to watch.
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
        </div>
    );
}
