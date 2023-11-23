import React, { useState } from "react";
import styles from "./ChangeLanguage.module.css";
import Button from "../../../shared/button/button";
import Switch from "../../../Components/Switch/Switch";
import { changeLanguage } from "../../../utils/language-selector/language-selector.ts";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";

export default function ChangeLanguage() {
    const [selectedOption, setSelectedOption] = useState(localStorageService.get("4RoomLanguage") || "en");

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
                Pick which language to use for 4ROOMS’s website.
            </p>
            <div className={styles.language__container_switch}>
                <div className={styles.language__container_wrapper}>
                    <div>
                        <p>English</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="en"
                        />
                    </div>
                    <div>
                        <p>Ukrainian</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="ua"
                        />
                    </div>
                </div>
            </div>
            <Button className="accent" type="button">
                Save
            </Button>
        </div>
    );
}
