import { ReactElement } from "react";
import { EditProfile, LanguageProfile, LeaveProfile, PasswordReset, ThemeProfile } from "../assets/icons";
import React from "react";

export const profileSections: { icon: ReactElement; name: string }[] = [
    {
        icon: <EditProfile />,
        name: "editprofile",
    },
    {
        icon: <PasswordReset />,
        name: "editpassword"
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
