import React from 'react';
import styles from './button.module.scss';

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
};

export default function Button({ onClick, children, type = 'button', className = '' }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${styles[className]}`}>
            {children}
        </button>
    );
}
