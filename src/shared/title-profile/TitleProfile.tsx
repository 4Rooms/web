import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TitleProfile() {
    const location = useLocation();
    const pathName = location.pathname;
    const rightPart = pathName.substring(pathName.lastIndexOf("/") + 1);
    const { t } = useTranslation('translation', { keyPrefix: 'my-profile' });

    console.log(rightPart)
    return (
        <h2>
            {rightPart === "" || rightPart === "profile"
                ? t('profile-title.editprofile') : rightPart === "password" ? t('profile-title.editpassword')
                : rightPart === "logout" ? t('profile-title.logout') : t('profile-title.change') + " " + t(`profile-title.${rightPart}`)}
        </h2>
    );
}
