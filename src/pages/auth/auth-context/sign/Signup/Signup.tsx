import React, { useState, useContext, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../auth-context.tsx";
import authService from "../../../../../services/auth/auth.service";
import { localStorageService } from "../../../../../services/local-storage/local-storage.ts";
import styles from "../Sign.module.scss";
import {
    Back,
    Error,
    Google,
    HiddenPassword,
    IconOkey,
    OpenPassword,
} from "../../../../../assets/icons.tsx";
import * as yup from "yup";
import {
    InputsRegistraytion,
    InputsValidRegistration,
} from "../../../../../App.types.ts";

const authSchema = yup.object().shape({
    username: yup
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
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Must be a valid email address"
        )
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

export default function Signup() {
    const { setUsername } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const inputArray: string[] = ["email", "username", "password"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const [formStateValue, setFormStateValue] = useState<InputsRegistraytion>({
        username: "",
        email: "",
        password: "",
    });

    const [formStateValid, setFormStateValid] =
        useState<InputsValidRegistration>({
            username: false,
            email: false,
            password: false,
        });
    const [formStateFocus, setFormStateFocus] =
        useState<InputsValidRegistration>({
            username: false,
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
    } = useForm<InputsRegistraytion>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
        resolver: yupResolver(authSchema),
    });

    const onFocusInput = (type: keyof InputsValidRegistration) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };

    const onClickChangeOpen = (): void => {
        setOpen((prevOpen): boolean => {
            return !prevOpen;
        });
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
                    clearErrors(type as keyof InputsRegistraytion);
                }
            })
            .catch((error) => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: false,
                });
                if (formSubmitted) {
                    setError(type as keyof InputsRegistraytion, {
                        message: error.message,
                    });
                }
            });
    };

    const deliveryFormAuth: SubmitHandler<InputsRegistraytion> = async (
        data
    ) => {
        const response = await authService.signup(data);
        setUsername(response.username);
        localStorageService.set("user", response);
        navigate("/");
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <div className={styles.wrapper__title}>
                    <Link to={backLinkLocation.current}>
                        <Back />
                    </Link>
                    <h3 className={styles.title__auth}>Create an account</h3>
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
                    Or sign up with email:
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
                                    {...register(
                                        value as keyof InputsRegistraytion
                                    )}
                                    aria-invalid={
                                        errors[
                                            value as keyof InputsRegistraytion
                                        ]
                                            ? "true"
                                            : "false"
                                    }
                                    placeholder={"Enter your " + value}
                                    type={
                                        value === "password"
                                            ? open
                                                ? "text"
                                                : "password"
                                            : value
                                    }
                                    style={{
                                        border:
                                            errors[
                                                value as keyof InputsRegistraytion
                                            ] &&
                                            !formStateValid[
                                                value as keyof InputsRegistraytion
                                            ]
                                                ? "1px solid red"
                                                : formStateValid[
                                                      value as keyof InputsRegistraytion
                                                  ] &&
                                                  !errors[
                                                      value as keyof InputsRegistraytion
                                                  ]
                                                ? "1px solid green"
                                                : !formStateValid[
                                                      value as keyof InputsRegistraytion
                                                  ] &&
                                                  !errors[
                                                      value as keyof InputsRegistraytion
                                                  ] &&
                                                  formStateFocus[
                                                      value as keyof InputsRegistraytion
                                                  ] &&
                                                  formStateValue[
                                                      value as keyof InputsRegistraytion
                                                  ].length > 0
                                                ? "1px solid var(--button-up)"
                                                : "1px solid var(--gray)",
                                    }}
                                    className={styles.input__auth}
                                    onChange={(e) =>
                                        onChange(
                                            e,
                                            value as keyof InputsRegistraytion
                                        )
                                    }
                                    onFocus={() =>
                                        onFocusInput(
                                            value as keyof InputsRegistraytion
                                        )
                                    }
                                />
                                {!errors[value as keyof InputsRegistraytion] &&
                                    formStateValid[
                                        value as keyof InputsRegistraytion
                                    ] && (
                                        <IconOkey
                                            className={styles.okey__auth}
                                        />
                                    )}
                                {value === "password" &&
                                    formStateValue.password?.length > 0 && !errors[value as keyof InputsRegistraytion] &&
                                    !formStateValid[
                                        value as keyof InputsRegistraytion
                                    ] && (
                                        <button className={styles.button__show} type="button" onClick={onClickChangeOpen}>
                                            {open ? (
                                                <OpenPassword />
                                            ) : (
                                                <HiddenPassword />
                                            )}
                                        </button>
                                    )}
                                {formStateFocus[
                                    value as keyof InputsRegistraytion
                                ] &&
                                    !formStateValid[
                                        value as keyof InputsRegistraytion
                                    ] &&
                                    !errors[
                                        value as keyof InputsRegistraytion
                                    ] &&
                                    formStateValue[
                                        value as keyof InputsRegistraytion
                                    ].length > 0 && (
                                        <div className={styles.focus__block}>
                                            <p>
                                                {
                                                    value as keyof InputsRegistraytion
                                                }
                                            </p>
                                        </div>
                                    )}
                                {errors[value as keyof InputsRegistraytion] &&
                                    !formStateValid[
                                        value as keyof InputsRegistraytion
                                    ] && (
                                        <p className={styles.text__error}>
                                            {
                                                errors[
                                                    value as keyof InputsRegistraytion
                                                ]?.message
                                            }
                                        </p>
                                    )}
                                {errors[value as keyof InputsRegistraytion] &&
                                    !formStateValid[
                                        value as keyof InputsRegistraytion
                                    ] && (
                                        <Error className={styles.error__auth} />
                                    )}
                            </label>
                        );
                    })}
                    <div className={styles.wrapper__buttons}>
                        <button
                            type="submit"
                            onClick={() => setFormSubmitted(true)}
                            className={styles.button__next}
                        >
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
