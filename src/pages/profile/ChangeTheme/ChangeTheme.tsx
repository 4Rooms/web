import React, { useState } from "react";
import styles from "./ChangeTheme.module.css";
import Button from "../../../shared/button/button";
import Switch from "../../../Components/Switch/Switch";
import WhiteTheme from "../../../assets/whiteTheme.jpg";
import BlackTheme from "../../../assets/BlackTheme.jpg";
export default function ChangeTheme() {
    const [selectedOption, setSelectedOption] = useState("White");

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value === "White" && selectedOption === "White") {
            setSelectedOption("Black");
        } else if (
            event.target.value === "Black" &&
            selectedOption === "Black"
        ) {
            setSelectedOption("White");
        } else {
            setSelectedOption(event.target.value);
        }
    };
    return (
        <div className={styles.theme__container}>
            <div className={styles.theme__container_wrapper}>
                <div>
                    <img src={WhiteTheme} />
                    <div className={styles.wrapper__option}>
                        <p>Light theme</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="White"
                        />
                    </div>
                </div>
                <div>
                    <img src={BlackTheme} />
                    <div className={styles.wrapper__option}>
                        <p>Dark theme</p>
                        <Switch
                            handleChange={handleLanguageChange}
                            selectedOption={selectedOption}
                            value="Black"
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
