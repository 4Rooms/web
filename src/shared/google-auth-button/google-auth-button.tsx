import React from "react";
import { Google } from "../../assets/icons.tsx";
import styles from "../../pages/auth/auth.module.scss";
import Button from "../button/button.tsx";

export default function GoogleAuthButton() {
    return (
        <div>
            <p className={styles.text__google}>Sign in with Google:</p>
            <Button className='google' onClick={() => window.open('https://back.4rooms.pro/oauth/login/google-oauth2/', '_blank')}>
                <Google/>
                Google
            </Button>

        </div>
    );
}
