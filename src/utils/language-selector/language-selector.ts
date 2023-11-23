import i18n from 'i18next';
import { localStorageService } from "../../services/local-storage/local-storage.ts";

export function setInitialLanguage(){
    const savedLang = localStorageService.get('4RoomLanguage');
    console.log(savedLang);
    if (savedLang) {
        i18n.changeLanguage(savedLang).then();
        return;
    }

    const userLang = navigator.language.split('-')[0];

    if (userLang === 'ua') {
        i18n.changeLanguage('ua').then();
    } else {
        i18n.changeLanguage('en').then();
    }
}

export function changeLanguage(lang: string){
    i18n.changeLanguage(lang).then();
    localStorageService.set("4RoomLanguage", lang);
}
