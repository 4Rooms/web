import * as yup from "yup";

export default yup.object().shape({
    username: yup
        .string()
        .min(1, "Name should have at least 1 character")
        .max(20, "Name should not exceed 20 characters")
        .matches(
            /^([@#$_]*[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9@#$_\s]+[@#$_]*)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            "Username can be either a name or an email address"
        )
        .required("Name is required"),
    email: yup
        .string()
        .email("Enter a valid email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Must be a valid email address"
        )
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password cannot exceed 128 characters")
        .matches(/^[\s\S]*$/, "Password can contain any character")
        .matches(
            /^[a-zA-Zа-яА-ЯєіїёЁ0-9!@#$%^&*()-_=+№{}|`' ]*$/,
            "Password must contain only letters, digits, spaces, and the following special characters: !@#$%^&*()-_=+№{}|`'"
        )
        .matches(
            /^(?=.*[a-zA-Zа-яА-ЯєіїёЁ])(?=.*\d)?[a-zA-Zа-яА-ЯєіїёЁ0-9!@#$%^&*()-_=+\s\S]*$/,
            "Password must contain at least one letter"
        )
        .required("Password is required"),
});
