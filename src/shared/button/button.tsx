import React from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
};

export default function Button({ onClick, children, type = 'button', className = '', disabled }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${styles[className]} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}>
            {children}
        </button>
    );
}
