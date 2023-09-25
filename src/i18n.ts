import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            'auth-page': {
                'hi': 'Hi',
                'welcome': 'welcome to the 4Rooms',
                'account': 'Have an account? Sign in or Sign up',
                'sign in': 'Sign in',
                'sign up': 'Sign up',
            },
            'sign-in-page': {
                'title': 'Authentication',
                'signInWithGoogle': 'Sign in with Google:',
                'orSignInWithCredentials': 'Or sign in with your username and password:',
                'enterUsername': 'Enter your username',
                'enterPassword': 'Enter your password',
                'forgotPassword': 'Forgot password?',
                'signInButton': 'Sign in'
            }
        }
    },
    ua: {
        translation: {
            'auth-page': {
                'hi': 'Привіт',
                'welcome': 'ласкаво просимо до 4Rooms',
                'account': 'Маєте обліковий запис? Увійдіть або зареєструйтесь',
                'sign in': 'Увійдіть',
                'sign up': 'Зареєструйтесь',
            },
            'sign-in-page': {
                'title': 'Аутентифікація',
                'signInWithGoogle': 'Увійдіть за допомогою Google:',
                'orSignInWithCredentials': 'Або увійдіть за допомогою вашого імені користувача та пароля:',
                'enterUsername': 'Введіть ваше ім’я користувача',
                'enterPassword': 'Введіть ваш пароль',
                'forgotPassword': 'Забули пароль?',
                'signInButton': 'Увійти'
            }
        }
    }
};

let userLanguage = localStorage.getItem('language');

if (!userLanguage) {
    const systemLanguage = navigator.language.split('-')[0];

    userLanguage = systemLanguage === 'ua' ? systemLanguage : 'en';
}


i18n.use(initReactI18next).init(
    {
        resources,
        lng: userLanguage,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
