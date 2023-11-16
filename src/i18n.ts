import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            'auth-page': {
                'hi': 'Hi',
                'welcome': 'Hi, welcome to 4Rooms!',
                'account': '\'Sign In\' if you\'re have an account or \'Sign Up\' to create one.',
                'sign in': 'Sign in',
                'sign up': 'Sign up',
                'googleSignUp': 'Or sign up with email:',
                'createAccount': 'Create account',
            },
            'sign-in-page': {
                'title': 'Authentication',
                'signInWithGoogle': 'Sign in with Google:',
                'orSignInWithCredentials': 'Or sign in with your username and password:',
                'enterUsername': 'Enter your username',
                'enterPassword': 'Enter your password',
                'forgotPassword': 'Forgot password?',
                'googleSignIn': 'Sign in with Google:',
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
            },
            'dashboard': {
                'header': 'Choose a room for chatting',
                'cinema': 'Cinema',
                'books': 'Books',
                'games': 'Games',
                'music': 'Music',
                'cinema-description': 'You can chat about any movies or series you\'ve already watched or plan to watch.',
                'games-description': 'Do you like video games? Maybe you\'re looking for a team that can join you in playing your favorite online video game.',
                'books-description': 'This room will suit you if you are fond of reading. Tell other users about the last book you\'ve read.',
                'music-description': 'In this room, you can discover a lot of new musicians or even styles of music and tell about your preferences.',
                'rooms': 'Rooms',
                'settings': 'Settings',
                'logout': 'Logout'
            },
            'filter': {
                'New': 'New',
                'Popular': 'Popular',
                'Old': 'Old',
                'cinema': 'Cinema',
                'books': 'Books',
                'games': 'Games',
                'music': 'Music',
            },
            'welcome': {
                'welcome': 'Welcome to the',
                'cinema': 'Cinema',
                'books': 'Books',
                'games': 'Games',
                'music': 'Music',
                'room': 'room!',
                'message': 'Choose any chat from the list on the left and start chatting. If you haven\'t found an interesting chat, create a new one using the <1>Create chat</1> button.',
                'createChat': 'Create chat',
            },
            'shared': {
                'email': 'Enter your email',
                'username': 'Enter your username',
                'password': 'Enter your password',
                'default': 'Enter your email',
            }
        }
    },
    ua: {
        translation: {
            'auth-page': {
                'hi': 'Вітаємо,',
                'welcome': 'Вітаємо, ласкаво просимо до 4Rooms!',
                'account': 'Натисніть "Увійти", якщо у вас є обліковий запис або "Зареєструватися", щоб створити його.',
                'sign in': 'Увійти',
                'sign up': 'Зареєструйтесь',
                'googleSignUp': 'Зареєструватися за допомогою пошти:',
                'createAccount': 'Створити аккаунт',
            },
            'sign-in-page': {
                'title': 'Аутентифікація',
                'signInWithGoogle': 'Увійдіть за допомогою Google:',
                'orSignInWithCredentials': 'Або увійдіть за допомогою вашого імені користувача та пароля:',
                'enterUsername': 'Введіть ваше ім’я користувача',
                'enterPassword': 'Введіть ваш пароль',
                'forgotPassword': 'Забули пароль?',
                'googleSignIn': 'Увійти за допомогою Google:',
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
            },
            'dashboard': {
                'header': 'Оберіть кімнату для спілкування',
                'cinema': 'Кіно',
                'books': 'Книги',
                'games': 'Ігри',
                'music': 'Музика',
                'cinema-description': 'Ви можете спілкуватися на тему будь-яких фільмів чи серіалів, які ви вже дивилися або плануєте переглянути.',
                'games-description': 'Ви любите відеоігри? Можливо, ви шукаєте компанію для спільного проходження завдання у вашій улюбленій онлайн-відеоігрі.',
                'books-description': 'Ця кімната вам підійде, якщо ви любите читати. Розкажіть іншим користувачам про останню прочитану книгу.',
                'music-description': 'У цій кімнаті ви можете відкрити для себе багато нових музичних виконавців або навіть стилів музики і розповісти про свої вподобання.',
                'rooms': 'Rooms',
                'settings': 'Settings',
                'logout': 'Logout'
            },
            'filter': {
                'New': 'Нові',
                'Popular': 'Популярні',
                'Old': 'Старі',
                'cinema': 'Кіно',
                'books': 'Книги',
                'games': 'Ігри',
                'music': 'Музика',
            },
            'welcome': {
                'welcome': 'Ласкаво просимо до',
                'cinema': 'Кіно',
                'books': 'Книги',
                'games': 'Ігри',
                'music': 'Музика',
                'room': 'кімнати!',
                'message': 'Выберите любой чат из списка слева и начните общение. Если вы не нашли интересующий чат, создайте новый, используя кнопку <1>Создать чат</1>.',
                'createChat': 'Створити чат'
            },
            'shared': {
                'email': 'Введіть свою пошту',
                'username': 'Введіть своє ім\'я',
                'password': 'Введіть свій пароль',
                'default': 'Enter your email',
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
