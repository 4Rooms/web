import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../../../../services/auth/auth.service.tsx";
import { EmailConfirmationResponse } from "../../../../../App.types.ts";
import { useTranslation } from "react-i18next";
import styles from "../Sign.module.css";
import { Back } from "../../../../../assets/icons.tsx";

export default function EmailConfirmPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const { t } = useTranslation("translation", { keyPrefix: "confirm-email" });
    const [text, setText] = useState<string>(t("initial"));

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token_id");

        if (!token) {
            return console.error("Token is missing");
        }

        authService
            .confirmEmail(token)
            .then((response: EmailConfirmationResponse) => {
                if (response.is_email_confirmed) {
                    setText(t("success"));
                    setTimeout(() => {
                        navigate("/authentication");
                    }, 3000);
                } else {
                    setText(t("error"));
                }
            })
            .catch(() => {
                setText(t("error"));
            });
    }, []);

    const sendConfirmAgain = () => {
        console.log("send new confrimation");
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <div className={styles.wrapper__title}>
                    <Link to={backLinkLocation.current}>
                        <Back />
                    </Link>
                    <h3 className={styles.title__auth}>Create an account</h3>
                </div>
                <div className={styles.wrapper__buttons} style={{ textAlign: "center", marginTop: "50%", marginBottom: "50%" }}>
                    <p className={styles.text__form}>
                        {text}
                    </p>
                    <button
                        type="submit"
                        onClick={() => sendConfirmAgain()}
                        className={styles.button__next}
                        style={{ backgroundColor: "#7b34d8" }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}
