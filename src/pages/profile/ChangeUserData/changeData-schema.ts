import * as yup from "yup";

export default yup.object().shape({
    profileUsername: yup
        .string()
        .min(1, "Name should have at least 1 character")
        .max(20, "Name should not exceed 20 characters")
        .matches(
            /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]+$/,
            "Name should contain only letters, digits, and spaces"
        )
        .required("Name is required"),
    profileEmail: yup
        .string()
        .email("Enter a valid email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Must be a valid email address"
        )
        .required("Email is required"),
});
