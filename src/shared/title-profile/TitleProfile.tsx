import React from "react";
import { useLocation } from "react-router-dom";

export default function TitleProfile() {
    const location = useLocation();
    const pathName = location.pathname;
    const rightPart = pathName.substring(pathName.lastIndexOf("/") + 1);
    console.log(rightPart)
    return (
        <h2>
            {rightPart === "" || rightPart === "profile"
                ? "Edit Profile" : rightPart === "password" ? "Edit Password"
                : rightPart === "logout" ? "Logout" : "Change" + " " + rightPart}
        </h2>
    );
}
