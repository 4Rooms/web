import React, { useState } from "react";
import styles from "./LogOut.module.css";
import Button from "../../../shared/button/button";
import Modal from "../../../Components/Modal/Modal";
export default function LogOut() {
    const [open, setOpen] = useState<boolean>(false);
    const onClickChangeOpenModal = (): void => {
        setOpen((prevOpen): boolean => {
            return !prevOpen;
        });
    };
    return (
        <div className={styles.logout__container}>
            <p>Are you sure you want to leave 4ROOM?</p>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
                type="button"
                className="accent"
            >
                Log Out
            </Button>
            {open && (
                <Modal className="profile" onOpen={onClickChangeOpenModal}>
                    <div className={styles.logout__container_modal}>
                        <h2>Log Out</h2>
                        <p>Are you sure you want to leave 4ROOM?</p>
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                            type="submit"
                            className="accent"
                        >
                            Log Out
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
