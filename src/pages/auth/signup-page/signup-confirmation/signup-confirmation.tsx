import React from "react";
import styles from "../../auth.module.scss";
import AuthWrapper from "../../../../shared/auth-wrapper/auth-wrapper.tsx";
import Button from "../../../../shared/button/button.tsx";
import { useLocation } from "react-router-dom";
import authService from "../../../../services/auth/auth.service.tsx";

export default function SignupConfirmation() {
    const location = useLocation();

    const deliveryFormAuth = async () => {
        await authService.sendSecondEmail(location.state?.formData.email);
    };

    return (
        <AuthWrapper title={"Create an account"} link={"/create-account"}>
            <div className={styles.body}>
                <h3 className={styles.text__confirm}>
                    We sent a message to your email. Please confirm your email.
                </h3>
                <Button className="accent" onClick={() => deliveryFormAuth()}>
                    send again
                </Button>
            </div>
        </AuthWrapper>
    );
}
