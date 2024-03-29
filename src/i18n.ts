import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            'auth-page': {
                'hi': 'Hi',
                'welcome': 'Hi, welcome to 4Rooms!',
                'account': '\'Sign In\' if you\'re have an account or \'Sign Up\' to create one.',
                'sign in': 'Sign in',
                'sign up': 'Sign up',
                'sign up with google': 'Sign up with Google:',
                'googleSignUp': 'Or sign up with email:',
                'createAccount': 'Create account',
                'signInButton': 'Sign in',
                'minLengthErrorUsername': 'Username must be at least 1 character long.',
                'maxLengthErrorUsername': 'Username cannot be longer than 20 characters.',
                'usernameRegexError': 'Username can be either a name or an email address.',
                'requiredUsername': 'Username is required.',
                'validEmailError': 'Enter a valid email address.',
                'forbiddenEmailDomainError': 'Email addresses from this domain are not permitted.',
                'emailRequired': 'Email is required.',
                'validEmailTextError': 'Must be a valid email address',
                'passwordMinError': 'Password must be at least 8 characters.',
                'passwordMaxError': 'Password cannot exceed 128 characters.',
                'passwordAnyCharError': 'Password can contain any character.',
                'passwordValidCharsError': 'Password must contain only letters, digits, spaces, and the following special characters: !@#$%^&*()-_=+№{}|`\'.',
                'passwordLetterError': 'Password must contain at least one letter.',
                'passwordRequired': 'Password is required.',
                'username': 'Сreate a username up to 20 characters.',
                'password': 'Please, create a password of at least 8 characters using letters and numbers.',
                'email': ''
            },
            'sign-in-page': {
                'title': 'Authentication',
                'signInWithGoogle': 'Sign in with Google:',
                'orSignInWithCredentials': 'Or sign in with your username and password:',
                'enterUsername': 'Enter your username',
                'enterPassword': 'Enter your password',
                'forgotPassword': 'Forgot password?',
                'googleSignIn': 'Sign in with Google:',
                'signInButton': 'Sign in',
                'minLengthErrorUsername':'Name should have at least 1 character',
                'maxLengthErrorUsernameOrEmail': 'Username or email cannot be longer than 128 characters.',
                'usernameRegexError':'Username can be either a name or an email address',
                'requiredUsernameOrEmail': 'Username or email is required.',
                'passwordMinError':'Password must be at least 8 characters',
                'passwordMaxError':'Password cannot exceed 128 characters',
                'passwordAnyCharError':'Password can contain any character',
                'passwordValidCharsError':'Password must contain only letters, digits, spaces, and the following special characters: !@#$%^&*()-_=+№{}|`\'',
                'passwordLetterError':'Password must contain at least one letter',
                'wrongPassword':'Wrong password. ',
                'passwordRequired':'Password is required',
                'username': 'Сreate a username up to 20 characters.',
                'password': 'Please, create a password of at least 8 characters using letters and numbers.'
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
                    'firstPart': 'We use files cookies only to collect information for functional. By clicking ',
                    'boldPart': ' "Accept All"',
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
                'profileEmail': 'Edit your email',
                'username': 'Enter your username',
                'profileUsername': 'Edit your username',
                'password': 'Enter your password',
                'default': 'Enter your email',
                'search': 'Search',
                'create new password': 'Create new password',
                'title': "Enter title name",
                'description': "Enter chat description ",
                "oldPassword": "Enter your old password",
                "newPassword": "Enter your new password",
            },
            'create-chat': {
                'title': 'Create a new chat',
                'button': 'Create',
            },
            'online': {
                'online': 'Online now:',
            },
            'menu-modal': {
                'edit': 'Edit',
                'delete': 'Delete',
                'was-deleted': 'The message is deleted'
            },
            'my-chart': {
                'page-title': 'My Chats',
            },
            'saved-chats': {
                'page-title': 'Saved Chats',
            },
            'message' : {
                "message": "Type something...",
                "delete": "The message is deleted"
            },
            'my-profile': {
                'page-title': 'My profile',
                'charts': 'My Chats',
                'saved': 'Saved Chats',
                'menu': {
                    'editprofile': 'Edit Profile',
                    'editpassword': 'Edit Password',
                    'language': 'Language',
                    'theme': 'Theme',
                    'logout': 'Log Out'
                },
                'profile-title': {
                    'editprofile': 'Edit Profile',
                    'editpassword': 'Edit Password',
                    'change': 'Change',
                    'language': 'language',
                    'theme': 'theme',
                    'logout': 'Log Out'
                },
                'change-password-description': 'To change your password, enter your old password and create a new one.',
                'pick-language': 'Pick which language to use for 4ROOMS’s website.',
                'en':'English',
                'ua':'Ukrainian',
                'save': 'Save',
                'light theme': 'Light theme',
                'dark theme': 'Dark theme',
                'logout description': 'Are you sure you want to leave 4ROOMS?',
                'logout': 'Log Out'
            },
        }
    },
    ua: {
        translation: {
            'auth-page': {
                'hi': 'Вітаємо,',
                'welcome': 'Вітаємо, ласкаво просимо до 4Rooms!',
                'account': 'Натисніть \'Увійти\', якщо у вас є обліковий запис або \'Зареєструватися\', щоб створити його.',
                'sign in': 'Увійти',
                'sign up': 'Зареєструватися',
                'sign up with google': 'Зареєструватися за допомогою Google:',
                'googleSignUp': 'Зареєструватися за допомогою пошти:',
                'createAccount': 'Створити аккаунт',
                'oneCharacterError': 'Ім\'я повинно містити щонайменше 1 символ',
                'minLengthErrorUsername': 'Ім\'я користувача повинно бути хоча б 1 символ завдовжки.',
                'maxLengthErrorUsername': 'Ім\'я користувача не може перевищувати 20 символів.',
                'usernameRegexError': 'Ім\'я користувача може бути ім\'ям або електронною адресою.',
                'requiredUsername': 'Необхідно ввести ім\'я користувача.',
                'validEmailError': 'Введіть дійсну електронну адресу.',
                'forbiddenEmailDomainError': 'Електронні адреси з цього домену заборонені.',
                'emailRequired': 'Електронна адреса є обов\'язковою.',
                'validEmailTextError': 'Має бути дійсною електронною адресою',
                'passwordMinError': 'Пароль повинен містити принаймні 8 символів.',
                'passwordMaxError': 'Пароль не може перевищувати 128 символів.',
                'passwordAnyCharError': 'Пароль може містити будь-які символи.',
                'passwordValidCharsError': 'Пароль має містити лише літери, цифри, пробіли та наступні спеціальні символи: !@#$%^&*()-_=+№{}|`\'.',
                'passwordLetterError': 'Пароль повинен містити хоча б одну літеру.',
                'wrongPassword':'Невірний пароль. ',
                'passwordRequired': 'Пароль є обов\'язковим.',
                "username": "Створіть ім'я користувача до 20 символів.",
                "password": "Будь ласка, створіть пароль не менше 8 символів, використовуючи літери та цифри.",
                'email': ''
            },
            'sign-in-page': {
                'title': 'Аутентифікація',
                'signInWithGoogle': 'Увійдіть за допомогою Google:',
                'orSignInWithCredentials': 'Або увійдіть за допомогою вашого імені користувача та пароля:',
                'enterUsername': 'Введіть ваше ім’я користувача',
                'enterPassword': 'Введіть ваш пароль',
                'forgotPassword': 'Забули пароль?',
                'googleSignIn': 'Увійти за допомогою Google:',
                'signInButton': 'Увійти',
                'minLengthErrorUsername': 'Ім\'я повинно містити принаймні 1 символ',
                'maxLengthErrorUsername': 'Ім\'я користувача не може перевищувати 20 символів.',
                'maxLengthErrorUsernameOrEmail': 'Ім\'я користувача або електронна адреса не можуть перевищувати 128 символів.',
                'usernameRegexError': 'Ім\'я користувача може бути або ім\'ям, або електронною адресою',
                'requiredUsernameOrEmail': 'Необхідно ввести ім\'я користувача або електронну адресу.',
                'passwordMinError': 'Пароль повинен бути не менше 8 символів',
                'passwordMaxError': 'Пароль не може перевищувати 128 символів',
                'passwordAnyCharError': 'Пароль може містити будь-які символи',
                'passwordValidCharsError': 'Пароль повинен містити тільки літери, цифри, пробіли та наступні спеціальні символи: !@#$%^&*()-_=+№{}|`\'',
                'passwordLetterError': 'Пароль повинен містити принаймні одну літеру',
                'passwordRequired': 'Пароль є обов\'язковим',
                "username": "Створіть ім'я користувача до 20 символів.",
                "password": "Будь ласка, створіть пароль не менше 8 символів, використовуючи літери та цифри.",
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
                    'firstPart': 'Ми використовуємо файли cookie лише для збору інформації з функціональною метою. Натискаючи ',
                    'boldPart': ' «Прийняти всі»',
                    'lastPart': ', ви даєте згоду на збір даних для вказаних цілей.'
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
                'message': 'Виберіть будь-який чат зі списку зліва та почніть спілкування. Якщо ви не знайшли цікавий чат, створіть новий, використовуючи кнопку <1>Створити чат</1>.',
                'createChat': 'Створити чат'
            },
            'shared': {
                'email': 'Введіть свою пошту',
                'profileEmail': 'Змініть свою пошту',
                'username': 'Введіть своє ім\'я',
                'profileUsername': 'Змініть своє ім\'я',
                'password': 'Введіть свій пароль',
                'default': 'Введіть свою електронну пошту',
                'search': 'Пошук',
                'create new password': 'Створіть новий пароль',
                'title': "Введіть назву заголовка",
                'description': "Введіть опис чату",
            },
            'create-chat': {
                'title': 'Створити новий чат',
                'button': 'Створити',
            },
            'online': {
                'online': 'Зараз в мережі:',
            },
            'menu-modal': {
                'edit': 'Редагувати',
                'delete': 'Видалити',
                'was-deleted': 'Це повідомлення видалено'
            },
            'my-chart': {
                'page-title': 'Мої чати',
            },
            'saved-chats': {
                'page-title': 'Збережені чати',
            },
            'message' : {
                "message": "Введіть ваше повідомлення",
                "delete": "Це повідомлення видалено"
            },
            'my-profile': {
                'page-title': 'Мій профіль',
                'charts': 'Мої чати',
                'saved': 'Збережені чати',
                'menu': {
                    'editprofile': 'Редагувати профіль',
                    'editpassword': 'Змінити Пароль',
                    'language': 'Мова',
                    'theme': 'Тема',
                    'logout': 'Вийти'
                },
                'profile-title': {
                    'editprofile': 'Редагувати профіль',
                    'editpassword': 'Змінити Пароль',
                    'change': 'Змінити',
                    'language': 'мову',
                    'theme': 'тему',
                    'logout': 'Вийти'
                },
                'change-password-description': 'Щоб змінити пароль, введіть старий пароль і створіть новий.',
                'pick-language': 'Оберіть мову для сайту 4ROOMS.',
                'en':'Англійська',
                'ua':'Українська',
                'save': 'Зберегти',
                'light theme': 'Cвітла тема',
                'dark theme': 'Темна тема',
                'logout description': 'Ви впевнені, що хочете покинути 4ROOMS?',
                'logout': 'Вийти'
            }
        }
    }
};

let userLanguage = localStorage.getItem('language');

if (!userLanguage) {
    const systemLanguage = navigator.language.split('-')[0];

    userLanguage = systemLanguage === 'ua' ? systemLanguage : 'en';
}


i18n.use(initReactI18next)?.init(
    {
        resources,
        lng: userLanguage,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
