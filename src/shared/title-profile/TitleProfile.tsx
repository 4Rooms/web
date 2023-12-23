import React from "react";
import { useLocation } from "react-router-dom";

export default function TitleProfile() {
    const location = useLocation();
    const pathName = location.pathname;
    const rightPart = pathName.substring(pathName.lastIndexOf("/") + 1);
    return (
        <h2>
            {rightPart === "" || rightPart === "profile"
                ? "Edit Your Profile" : rightPart === "password" ? "Edit Password"
                : rightPart === "logout" ? "Log Out" : "Change" + " " + rightPart}
        </h2>
    );
}
