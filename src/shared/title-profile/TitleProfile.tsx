import React from "react";
import { useLocation } from "react-router-dom";

export default function TitleProfile({ title }: { title: string | null }) {
    const location = useLocation();
    const pathName = location.pathname;
    const rightPart = pathName.substring(pathName.lastIndexOf("/") + 1);
    return (
        <h2>
            {rightPart === "editprofile" || rightPart === "logout"
                ? title
                : "Change" + " " + rightPart}
        </h2>
    );
}
