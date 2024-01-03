import * as yup from "yup";
const forbiddenEmailDomains = [
    'mail.ru', 'yandex.ru', 'bk.ru', 'inbox.ru', 'list.ru', 'rambler.ru', 'vk.com'
];

export default yup.object().shape({
    username: yup
        .string()
        .min(1, 'minLengthErrorUsername')
        .test('is-valid-username', 'maxLengthErrorUsername',
            (value) => (value ?? '').split('@')[0].trim().length <= 20)
        .matches(
            /^([@#$_]*[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9@#$_]+[@#$_]*)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            'usernameRegexError'
        )
        .required('requiredUsername'),
    email: yup
        .string()
        .email('validEmailError')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'validEmailTextError'
        )
        .test(
            'forbiddenDomainCheck',
            'forbiddenEmailDomainError',
            (value) => {
                if (!value) return true;
                const domain = value.split('@')[1];
                return !forbiddenEmailDomains.includes(domain);
            }
        )
        .required('emailRequired'),
    password: yup
        .string()
        .min(8, 'passwordMinError')
        .max(128, 'passwordMaxError')
        .matches(/^[\s\S]*$/, 'passwordAnyCharError')
        .matches(
            /^[a-zA-Zа-яА-ЯєіїёЁ0-9!@#$%^&*()-_=+№{}|`' ]*$/,
            'passwordValidCharsError'
        )
        .matches(
            /^(?=.*[a-zA-Zа-яА-ЯєіїёЁ])(?=.*\d)[a-zA-Zа-яА-ЯєіїёЁ0-9!@#$%^&*()-_=+]*$/,
            'passwordLetterError'
        )
        .required('passwordRequired'),
});
