import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./SharedLayout.module.css";

type Props = {
    user: string | null;
    isAuthenticated?: boolean;
    showHeader: boolean;
};

export default function SharedLayout({user, showHeader, isAuthenticated}: Props) {
    return <>
        <header className={`${styles.header__user} ${isAuthenticated && styles.authenticated}`}>
            <Navigation user={user} showHeader={showHeader}/>
        </header>
        <Outlet/>
    </>

}
