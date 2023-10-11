import React, { MouseEventHandler, useEffect } from "react";
import { ChildrenModal } from "../../App.types";
import styles from "./Modal.module.css";
import { CloseModal } from "../../assets/icons";
import { createPortal } from "react-dom";

const modalRoot: null | Element = document.querySelector("#modal-root");

export default function Modal({ children, onOpen, className }: ChildrenModal) {
    function handleKeyDown(event: KeyboardEvent) {
        if (event.code === "Escape") {
            onOpen();
        }
    }
    const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.target === event.currentTarget) {
            onOpen();
        }
    };    
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return createPortal(
        <div onClick={handleBackdropClick} className={styles.overlay} >
            <div className={styles.window}>
                <button className={styles.close} onClick={onOpen}>
                    <CloseModal />
                </button>
                {children}
            </div>
        </div>,
        modalRoot as Element
    );
}
