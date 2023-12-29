import React, { useState } from "react";
import styles from "./LogOut.module.scss";
import Button from "../../../shared/button/button";
import Modal from "../../../Components/Modal/Modal";
import { useTranslation } from "react-i18next";
export default function LogOut() {
    const [open, setOpen] = useState<boolean>(false);
    const performLogout = async () => {
        try {
            localStorage.clear();
            setOpen(false);
            document.location.reload();
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }
        const onClickChangeOpenModal = (): void => {
        setOpen((prevOpen): boolean => !prevOpen);
    };
    const { t } = useTranslation('translation', { keyPrefix: 'my-profile' });

    return (
        <div className={styles.logout__container}>
            <p>{t('logout description')}</p>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
                type="button"
                className="accent"
            >
                {t('logout')}
            </Button>
            {open && (
                <Modal className="profile" onOpen={onClickChangeOpenModal}>
                    <div className={styles.logout__container_modal}>
                        <h2>{t('logout')}</h2>
                        <p>{t('logout description')}</p>
                        <Button
                            onClick={performLogout}
                            type="submit"
                            className="accent"
                        >
                            {t('logout')}
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
