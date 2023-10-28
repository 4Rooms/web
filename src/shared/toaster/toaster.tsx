import React, { useState, useEffect, CSSProperties } from 'react';

const styles: { container: CSSProperties } = {
    container: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        top: '20px',
        right: '20px',
        backgroundColor: '#FFC107', // Цвет фона в стиле изображения
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        color: '#333',
        fontSize: '16px',
    },
};


export default function Toaster({ messages, isVisible, onHide }: { messages: string[], isVisible: boolean, onHide: () => void }){
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
        if (isVisible) {
            const timer = setTimeout(() => {
                setShow(false);
                onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    if (!show) return null;

    return (
        <div style={styles.container}>
            {messages.map((message, index) => <div key={index}>{message}</div>)}
        </div>
    );
}
