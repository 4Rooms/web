import * as yup from "yup";

export default yup.object().shape({
    username: yup
        .string()
        .min(1, 'minLengthErrorUsername')
        .test('is-valid-username', 'maxLengthErrorUsername',
            (value) => (value ?? '').split('@')[0].trim().length <= 20)
        .matches(
            /^([@#$_]*[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9@#$_\s]+[@#$_]*)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            'usernameRegexError'
        )
        .required('requiredUsername'),
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
            /^(?=.*[a-zA-Zа-яА-ЯєіїёЁ])(?=.*\d)?[a-zA-Zа-яА-ЯєіїёЁ0-9!@#$%^&*()-_=+\s\S]*$/,
            'passwordLetterError'
        )
        .required('passwordRequired'),
});
