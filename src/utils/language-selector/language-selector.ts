import i18n from 'i18next';
import { localStorageService } from "../../services/local-storage/local-storage.ts";

export function setInitialLanguage(){
    const savedLang = localStorageService.get('4RoomLanguage');
    if (savedLang) {
        i18n?.changeLanguage(savedLang);
        return;
    }

    const userLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'ua'];

    if (supportedLangs.includes(userLang)) {
        i18n?.changeLanguage(userLang);
    } else {
        i18n?.changeLanguage('en');
    }
}

export function changeLanguage(lang: string){
    i18n.changeLanguage(lang);
    localStorageService.set("4RoomLanguage", lang);
}
