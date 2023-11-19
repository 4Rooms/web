import React, { useState } from "react";
import styles from "../../auth.module.scss";
import AuthWrapper from "../../../../shared/auth-wrapper/auth-wrapper.tsx";
import Button from "../../../../shared/button/button.tsx";
import Toaster from "../../../../shared/toaster/toaster.tsx";

export default function SignupConfirmation() {
    /*const {setUsername} = useContext(AuthContext);
    const location = useLocation();*/
    const [endpointsError, setEndpointsError] = useState<string[]>([""]);
    const [showToaster, setShowToaster] = useState(false);

    const deliveryFormAuth = async () => {
        console.log("confirm");
        setEndpointsError(["Not implemented yet."]);

        setShowToaster(true);

        /*await authService.signup(location.state?.formData).then((response) => {
            setUsername(response.data.username);
            localStorageService.set("user", response);
        });*/
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
                <Toaster
                    messages={endpointsError}
                    isVisible={showToaster}
                    onHide={() => setShowToaster(false)}
                />
            </div>
        </AuthWrapper>
    );
}
