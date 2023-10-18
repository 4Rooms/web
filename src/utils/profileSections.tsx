import { ReactElement } from "react";
import { EditProfile, LanguageProfile, LeaveProfile, ThemeProfile } from "../assets/icons";
import React from "react";

export const profileSections: { icon: ReactElement; name: string }[] = [
    {
        icon: <EditProfile />,
        name: "Edit Profile",
    },
    {
        icon: <LanguageProfile />,
        name: "Language",
    },
    {
        icon: <ThemeProfile />,
        name: "Theme",
    },
    {
        icon: <LeaveProfile />,
        name: "Exit",
    },
];
