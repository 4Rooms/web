import React, { useState } from "react";
import styles from "./ChangeLanguage.module.scss";
import Switch from "../../../Components/Switch/Switch";
import { changeLanguage } from "../../../utils/language-selector/language-selector.ts";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import { useTranslation } from "react-i18next";

export default function ChangeLanguage() {
    const [selectedOption, setSelectedOption] = useState(localStorageService.get("4RoomLanguage") || "en");
    const { t } = useTranslation('translation', { keyPrefix: 'my-profile' });

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newLanguage = event.target.value;
        if (newLanguage !== selectedOption) {
            setSelectedOption(newLanguage);
            changeLanguage(newLanguage);
        }
    };

    return (
        <div className={styles.language__container}>
            <p className={styles.language__container_title}>
                {t('pick-language')}
            </p>
            <div className={styles.language__container_switch}>
                <div className={styles.language__container_wrapper}>
                    <div>
                        <p>{t('en')}</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="en"
                        />
                    </div>
                    <div>
                        <p>{t('ua')}</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="ua"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
