import * as yup from "yup";

export default yup.object().shape({
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
