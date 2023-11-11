import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({user, showHeader}: Props) {
    return <>
        <header className={styles.header__user}>
            {showHeader && <Navigation user={user}/>}
        </header>
        <Outlet/>
    </>

}
