import React, { useState } from "react";
import styles from "./ChangeTheme.module.css";
import Switch from "../../../Components/Switch/Switch";
import WhiteTheme from "../../../assets/whiteTheme.jpg";
import BlackTheme from "../../../assets/blackTheme.jpg";
import { useTranslation } from "react-i18next";
export default function ChangeTheme() {
    const [selectedOption, setSelectedOption] = useState("White");
    const { t } = useTranslation('translation', { keyPrefix: 'my-profile' });

    const handleLanguageChange = () => {
        const newTheme = selectedOption === "White" ? "Black" : "White";

        setSelectedOption(newTheme);

        const themeAttribute = newTheme === "White" ? "light" : "dark";
        document.documentElement.setAttribute('data-theme', themeAttribute);
    };
    return (
        <div className={styles.theme__container}>
            <div className={styles.theme__container_wrapper}>
                <div>
                    <img src={WhiteTheme} alt=""/>
                    <div className={styles.wrapper__option}>
                        <p>{t('light theme')}</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="White"
                        />
                    </div>
                </div>
                <div>
                    <img src={BlackTheme} alt=""/>
                    <div className={styles.wrapper__option}>
                        <p>{t('dark theme')}</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="Black"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
