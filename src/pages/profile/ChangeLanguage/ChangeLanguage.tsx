import React, { useState } from "react";
import styles from "./ChangeLanguage.module.css";
import Button from "../../../shared/button/button";
import Switch from "../../../Components/Switch/Switch";
export default function ChangeLanguage() {
    const [selectedOption, setSelectedOption] = useState("English");

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value === "English" && selectedOption === "English") {
            setSelectedOption("Ukrainian");
        } else if (
            event.target.value === "Ukrainian" &&
            selectedOption === "Ukrainian"
        ) {
            setSelectedOption("English");
        } else {
            setSelectedOption(event.target.value);
        }
    };
    return (
        <div className={styles.language__container}>
            <p className={styles.language__container_title}>
                Pick which language to use for 4ROOMS’s website.
            </p>
            <div className={styles.language__container_wrapper}>
                <div>
                    <p>English</p>
                    <Switch
                        handleChange={handleLanguageChange}
                        selectedOption={selectedOption}
                        value="English"
                    />
                </div>
                <div>
                    <p>Ukrainian</p>
                    <Switch
                        handleChange={handleLanguageChange}
                        selectedOption={selectedOption}
                        value="Ukrainian"
                    />
                </div>
            </div>
            <Button className="accent" type="button">
                Save
            </Button>
        </div>
    );
}
