import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            'auth-page': {
                'hi': 'Hi',
                'welcome': 'Hi, welcome to 4Rooms!',
                'account': 'Sign In if you have an account or Sign Up to create one.',
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
            },
            'confirm-email': {
                'initial': 'Please wait for confirmation...',
                'success': 'Email address successfully confirmed',
                'fail': 'Failed to confirm email address'
            },
            'consent': {
                'header': 'Consent to use files cookies',
                'acceptAll': 'Accept all',
                'description': {
                    'firstPart': 'We use files cookies only to collect information for functional. By clicking',
                    'boldPart': '"Accept All"',
                    'lastPart': ', you consent to data collection for the above purposes'
                }
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
            },
            'confirm-email': {
                'initial': 'Будь ласка, почекайте йде підтвердженя...',
                'success': 'Електронну адресу успішно підтверджено',
                'fail': 'Не вдалося підтвердити електронну адресу'
            },
            'consent': {
                'header': 'Згода на використання файлів cookie',
                'acceptAll': 'Прийняти всі',
                'description': {
                    'firstPart': 'Ми використовуємо файли cookie лише для збору інформації з функціональною метою. Натискаючи',
                    'boldPart': '«Прийняти всі»',
                    'lastPart': ', ви даєте згоду на збір даних для вказаних цілей'
                }
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
