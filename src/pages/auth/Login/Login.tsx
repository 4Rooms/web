import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../auth-context/auth-context";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import styles from "./Login.module.scss";
import { Back, Error, Google, IconOkey } from "../../../assets/icons.tsx";
import * as yup from "yup";
import { Inputs, InputsValid } from "../../../App.types.ts";

const authSchema = yup.object().shape({
    name: yup
        .string()
        .min(1, "Name should have at least 1 character")
        .max(20, "Name should not exceed 20 characters")
        .matches(
            /^[a-zA-Zа-яА-Я0-9\s]+$/,
            "Name should contain only letters, digits, and spaces"
        )
        .required("Name is required"),
    email: yup
        .string()
        .email("Enter a valid email address")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Must be a valid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password cannot exceed 128 characters")
        .matches(
            /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я0-9!@#$%^&*()-_=+]+$/,
            "Password must contain at least one letter, one digit, and one special character"
        )
        .required("Password is required"),
});

export default function Login() {
    const { setUsername } = useContext(AuthContext);
    const inputArray: string[] = ["email", "password", "name"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const [formStateValue, setFormStateValue] = useState<Inputs>({
        name: "",
        email: "",
        password: "",
    });

    const [formStateValid, setFormStateValid] = useState<InputsValid>({
        name: false,
        email: false,
        password: false,
    });
    const [formStateFocus, setFormStateFocus] = useState<InputsValid>({
        name: false,
        email: false,
        password: false,
    });

    const {
        register,
        handleSubmit,
        reset,
        setError, 
        clearErrors,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
        resolver: yupResolver(authSchema),
    });

    const navigate = useNavigate();

    const onFocusInput = (type: keyof InputsValid) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        authSchema
            .validateAt(type, { [type]: value })
            .then(() => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: true,
                });
                if (formSubmitted) {
                    clearErrors(type as keyof Inputs);
                }
            })
            .catch((error) => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: false,
                });
                console.log(formSubmitted)
                if (formSubmitted) {
                    setError(type as keyof Inputs, { message: error.message});
                }
            });
    };

    const deliveryFormAuth: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        console.log(formStateValid);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <div className={styles.wrapper__title}>
                    <Back />
                    <h3 className={styles.title__auth}>Authentication</h3>
                </div>
                <form
                    className={styles.form__auth}
                    onSubmit={handleSubmit(deliveryFormAuth)}
                >
                    <div>
                        <p className={styles.text__google}>
                            Sign in with Google:
                        </p>
                        <Link
                            to={
                                "https://back.4rooms.pro/oauth/login/google-oauth2/"
                            }
                        >
                            <button
                                className={styles.button__google}
                                type={"button"}
                            >
                                <Google />
                                Google
                            </button>
                        </Link>
                    </div>
                    <h2 className={styles.text__form}>
                        Or sign in with your username and password:
                    </h2>
                    {inputArray.map((value) => {
                        return (
                            <label
                                htmlFor={value}
                                className={styles.label__auth}
                                key={value}
                            >
                                <input
                                    autoComplete="off"
                                    {...register(value as keyof Inputs)}
                                    aria-invalid={
                                        errors[value as keyof Inputs]
                                            ? "true"
                                            : "false"
                                    }
                                    placeholder={"Enter your " + value}
                                    type="value"
                                    style={{
                                        border: errors[value as keyof Inputs] && !formStateValid[value as keyof Inputs]
                                            ? "1px solid red"
                                            : formStateValid[
                                                  value as keyof Inputs
                                              ] &&
                                              !errors[value as keyof Inputs]
                                            ? "1px solid green"
                                            : !formStateValid[
                                                  value as keyof Inputs
                                              ] &&
                                              !errors[value as keyof Inputs] &&
                                              formStateFocus[
                                                  value as keyof Inputs
                                              ] &&
                                              formStateValue[
                                                  value as keyof Inputs
                                              ].length > 0
                                            ? "1px solid var(--button-up)"
                                            : "1px solid var(--gray)",
                                    }}
                                    className={styles.input__auth}
                                    onChange={(e) => onChange(e, value as keyof Inputs)}
                                    onFocus={() => onFocusInput(value as keyof Inputs)}
                                />
                                {!errors[value as keyof Inputs] &&
                                    formStateValid[value as keyof Inputs] && (
                                        <IconOkey
                                            className={styles.okey__auth}
                                        />
                                    )}
                                {formStateFocus[value as keyof Inputs] &&
                                    !formStateValid[value as keyof Inputs] &&
                                    !errors[value as keyof Inputs] &&
                                    formStateValue[value as keyof Inputs]
                                        .length > 0 && (
                                        <div className={styles.focus__block}>
                                            <p>{value as keyof Inputs}</p>
                                        </div>
                                    )}
                                {errors[value as keyof Inputs] && !formStateValid[value as keyof Inputs] && (
                                    <p className={styles.text__error}>
                                        {errors[value as keyof Inputs]?.message}
                                    </p>
                                )}
                                {errors[value as keyof Inputs] && !formStateValid[value as keyof Inputs] && (
                                    <Error className={styles.error__auth} />
                                )}
                            </label>
                        );
                    })} 
                    <div className={styles.wrapper__buttons}>
                        <button type="submit" onClick={() => setFormSubmitted(true)} className={styles.button__next}>
                            Sign in
                        </button>
                        <Link
                            className={styles.button__forgot}
                            to={"/forgot-password"}
                        >
                            Forgot password
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
