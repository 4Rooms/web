import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import styles from "./Dashboard.module.css";
import { optionDashboard } from "../../utils/optionDashboard";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function DashboardPage() {
    interface StyledLiProps {
        hoverItem: string;
        backGround: string;
    }

    const Item = styled.li.withConfig({
        shouldForwardProp: (prop) =>
            isPropValid(prop) && prop !== "hoverItem" && prop !== "backGround",
    })<StyledLiProps>`
        background-color: ${({ backGround }) => backGround && backGround};
        &:hover {
            background-color: ${({ hoverItem }) => hoverItem && hoverItem};
        }
    `;
    return (
        <div className={styles.overlay}>
            <div>
                <h1 className={styles.title__dashboard}>
                    Choose a room for chatting
                </h1>
                <ul className={styles.list__dashboard}>
                    {optionDashboard.map((option) => {
                        console.log(option.background);
                        return (
                            <Item
                                className={styles.item__dashboard}
                                key={option.name}
                                hoverItem={option.hover}
                                backGround={option.background}
                            >
                                <Link
                                    to={option.name}
                                    style={{ width: "100%" }}
                                    className={styles.link__dashboard}
                                >
                                    <div>
                                        <p className={styles.text__dashboard}>
                                            {option.name}
                                        </p>
                                        <p
                                            className={
                                                styles.text__dashboard__desctiption
                                            }
                                        >
                                            You can chat about any movies or
                                            series you've already watched or
                                            plan to watch.
                                        </p>
                                    </div>
                                </Link>
                            </Item>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
