import React from "react";
import { Google } from "../../assets/icons.tsx";
import styles from "../../pages/auth/auth.module.scss";
import Button from "../button/button.tsx";

export default function GoogleAuthButton({translation}: {translation: string}) {
    return (
        <div>
            <p className={styles.text__google}>{translation}</p>
            <Button className='google' onClick={() => window.location.href = 'https://back.4rooms.pro/oauth/login/google-oauth2/?next=' + import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URL}>
                <Google/>
                Google
            </Button>

        </div>
    );
}
