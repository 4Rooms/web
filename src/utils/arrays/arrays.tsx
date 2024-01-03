import { ReactElement } from "react";
import {
    EditProfile,
    LanguageProfile,
    LeaveProfile,
    PasswordReset,
    ThemeProfile,
} from "../../assets/icons";
import React from "react";

export const profileSections: { icon: ReactElement; name: string }[] = [
    {
        icon: <EditProfile />,
        name: "editprofile",
    },
    {
        icon: <PasswordReset />,
        name: "editpassword",
    },
    {
        icon: <LanguageProfile />,
        name: "language",
    },
    {
        icon: <ThemeProfile />,
        name: "theme",
    },
    {
        icon: <LeaveProfile />,
        name: "logout",
    },
];

export const optionDashboard: {
    name: string;
    background: string;
    hover: string;
    text: string;
    translation: string;
}[] = [
    {
        name: "Cinema",
        background: "#B3DCCF",
        hover: "#61C9A8",
        translation: "cinema-description",
        text: "You can chat about any movies or series you've already watched or plan to watch.",
    },
    {
        name: "Games",
        background: "#F2B5B5",
        hover: "#F66",
        translation: "games-description",
        text: "Do you like video games? Maybe you're looking for a team that can join you in playing your favorite online video game.",
    },
    {
        name: "Books",
        background: "#EED78C",
        hover: "#F5BB00",
        translation: "books-description",
        text: "This room will suit you if you are fond of reading. Tell other users about the last book you've read.",
    },
    {
        name: "Music",
        background: "#DFB8F1",
        hover: "#D06EFD",
        translation: "music-description",
        text: "In this room, you can discover a lot of new musicians or even styles of music and tell about your preferences.",
    },
];

export const pathsToHideHeader = [
    "/authentication",
    "/auth",
    "/create-account",
    "/password-reset",
    "/forgot-password",
    "/account-confirmation",
    "/confirm-email",
];

export const pathsForShowBackGround = ["cinema", "books", "games", "music"];

export const emojisResponse = ["😀", "😈", "😎", "💀", "❤️"];

export const filterButton: string[] = ["Cinema", "Books", "Music", "Games"];
