import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChangeLanguage() {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    const handleLanguageChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        const lng = event.target.value;
        i18n?.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setSelectedLanguage(lng);
    };

    return (
        <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">{t('English')}</option>
            <option value="ua">{t('Ukrainian')}</option>
        </select>
    );
}
