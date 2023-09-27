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
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
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
            })
            .catch(() => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: false,
                });
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
                                    placeholder="Enter your value"
                                    type="value"
                                    style={{
                                        border: errors[value as keyof Inputs]
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
                                            <p>value</p>
                                        </div>
                                    )}
                                {errors[value as keyof Inputs] && (
                                    <p className={styles.text__error}>
                                        {errors[value as keyof Inputs]?.message}
                                    </p>
                                )}
                                {errors[value as keyof Inputs] && (
                                    <Error className={styles.error__auth} />
                                )}
                            </label>
                        );
                    })}
                    <label htmlFor="email" className={styles.label__auth}>
                        <input
                            autoComplete="off"
                            {...register("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                            placeholder="Enter your email"
                            type="email"
                            style={{
                                border: errors.email
                                    ? "1px solid red"
                                    : formStateValid.email && !errors.email
                                    ? "1px solid green"
                                    : !formStateValid.email &&
                                      !errors.email &&
                                      formStateFocus.email &&
                                      formStateValue.email.length > 0
                                    ? "1px solid var(--button-up)"
                                    : "1px solid var(--gray)",
                            }}
                            className={styles.input__auth}
                            onChange={(e) => onChange(e, "email")}
                            onFocus={() => onFocusInput("email")}
                        />
                        {!errors.email && formStateValid.email && (
                            <IconOkey className={styles.okey__auth} />
                        )}
                        {formStateFocus.email &&
                            !formStateValid.email &&
                            !errors.email &&
                            formStateValue.email.length > 0 && (
                                <div className={styles.focus__block}>
                                    <p>email</p>
                                </div>
                            )}
                        {errors.email && (
                            <p className={styles.text__error}>
                                {errors.email.message}
                            </p>
                        )}
                        {errors.email && (
                            <Error className={styles.error__auth} />
                        )}
                    </label>
                    <label htmlFor="name" className={styles.label__auth}>
                        <input
                            autoComplete="off"
                            {...register("name")}
                            aria-invalid={errors.name ? "true" : "false"}
                            placeholder="Enter your name"
                            type="name"
                            style={{
                                border: errors.name
                                    ? "1px solid red"
                                    : formStateValid.name && !errors.name
                                    ? "1px solid green"
                                    : !formStateValid.name &&
                                      !errors.name &&
                                      formStateFocus.name &&
                                      formStateValue.name.length > 0
                                    ? "1px solid var(--button-up)"
                                    : "1px solid var(--gray)",
                            }}
                            className={styles.input__auth}
                            onChange={(e) => onChange(e, "name")}
                            onFocus={() => onFocusInput("name")}
                        />
                        {!errors.name && formStateValid.name && (
                            <IconOkey className={styles.okey__auth} />
                        )}
                        {formStateFocus.name &&
                            !formStateValid.name &&
                            !errors.name &&
                            formStateValue.name.length > 0 && (
                                <div className={styles.focus__block}>
                                    <p>name</p>
                                </div>
                            )}
                        {errors.name && (
                            <p className={styles.text__error}>
                                {errors.name.message}
                            </p>
                        )}
                        {errors.name && (
                            <Error className={styles.error__auth} />
                        )}
                    </label>
                    <label htmlFor="email" className={styles.label__auth}>
                        <input
                            autoComplete="off"
                            {...register("email")}
                            aria-invalid={errors.email ? "true" : "false"}
                            placeholder="Enter your email"
                            type="email"
                            style={{
                                border: errors.email
                                    ? "1px solid red"
                                    : formStateValid.email && !errors.email
                                    ? "1px solid green"
                                    : !formStateValid.email &&
                                      !errors.email &&
                                      formStateFocus.email &&
                                      formStateValue.email.length > 0
                                    ? "1px solid var(--button-up)"
                                    : "1px solid var(--gray)",
                            }}
                            className={styles.input__auth}
                            onChange={(e) => onChange(e, "email")}
                            onFocus={() => onFocusInput("email")}
                        />
                        {!errors.email && formStateValid.email && (
                            <IconOkey className={styles.okey__auth} />
                        )}
                        {formStateFocus.email &&
                            !formStateValid.email &&
                            !errors.email &&
                            formStateValue.email.length > 0 && (
                                <div className={styles.focus__block}>
                                    <p>email</p>
                                </div>
                            )}
                        {errors.email && (
                            <p className={styles.text__error}>
                                {errors.email.message}
                            </p>
                        )}
                        {errors.email && (
                            <Error className={styles.error__auth} />
                        )}
                    </label>

                    <div className={styles.wrapper__buttons}>
                        <button type="submit" className={styles.button__next}>
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
