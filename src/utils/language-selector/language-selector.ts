import i18n from 'i18next';
import { localStorageService } from "../../services/local-storage/local-storage.ts";

export function setInitialLanguage(){
    const savedLang = localStorageService.get('4RoomLanguage');
    if (savedLang) {
        i18n?.changeLanguage(savedLang);
        return;
    }

    const userLang = navigator.language.split('-')[0];

    if (userLang === 'en') {
        i18n?.changeLanguage('en');
    } else {
        i18n?.changeLanguage('ua');
    }
}

export function changeLanguage(lang: string){
    i18n?.changeLanguage(lang);
    localStorageService.set("4RoomLanguage", lang);
}
