import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
};

export default function SharedLayout({user}: Props) {
    return <>
        <header className={styles.header__user}>
            <Navigation user={user}/>
        </header>
        <Outlet/>
    </>

}
