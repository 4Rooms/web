import React, { useContext } from "react";
import styles from "../../auth.module.scss";
import { useLocation } from "react-router-dom";
import authService from "../../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../../services/local-storage/local-storage.ts";
import { AuthContext } from "../../auth-context/auth-context.tsx";
import AuthWrapper from "../../../../shared/auth-wrapper/auth-wrapper.tsx";
import Button from "../../../../shared/button/button.tsx";

export default function SignupConfirmation() {
    const {setUsername} = useContext(AuthContext);
    const location = useLocation();
    const deliveryFormAuth = async () => {
        await authService.signup(location.state?.formData).then((response) => {
            setUsername(response.username);
            localStorageService.set("user", response);
        });
    };

    return <AuthWrapper title={'Create an account'} link={'/create-account'}>
        <div className={styles.body}>
            <h3 className={styles.text__confirm}>We sent a message to your email.<br/>
                Please confirm your identity.
            </h3>
            <Button className='accent' onClick={() => deliveryFormAuth()}>send again</Button>
        </div>
    </AuthWrapper>

}
