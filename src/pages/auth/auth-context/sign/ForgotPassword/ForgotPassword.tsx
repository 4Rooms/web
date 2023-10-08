import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../Sign.module.scss";
import { Back, Error, IconOkey } from "../../../../../assets/icons.tsx";
import * as yup from "yup";
import { InputsReset, InputsValidReset } from "../../../../../App.types.ts";

const resetSchema = yup.object().shape({
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

export default function ForgotPassword() {
    const inputArray: string[] = ["password"];
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const [formStateValue, setFormStateValue] = useState<InputsReset>({
        password: "",
    });

    const [formStateValid, setFormStateValid] = useState<InputsValidReset>({
        password: false,
    });
    const [formStateFocus, setFormStateFocus] = useState<InputsValidReset>({
        password: false,
    });

    const {
        register,
        handleSubmit,
        /*
        reset,
*/
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<InputsReset>({
        defaultValues: {
            password: "",
        },
        resolver: yupResolver(resetSchema),
    });

    const onFocusInput = (type: keyof InputsValidReset) => {
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

        resetSchema
            .validateAt(type, { [type]: value })
            .then(() => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: true,
                });
                clearErrors(type as keyof InputsReset);
            })
            .catch((error) => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: false,
                });
                setError(type as keyof InputsReset, {
                    message: error.message,
                });
            });
    };

    const deliveryFormAuth: SubmitHandler<InputsReset> = async (/*data*/) => {
        // const response = await authService.signup(data);
        // localStorageService.set("user", response);
        // navigate("/");
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <div className={styles.wrapper__title}>
                    <Link to={backLinkLocation.current}>
                        <Back />
                    </Link>
                    <h3 className={styles.title__auth}>Forgot password</h3>
                </div>
                <form
                    className={styles.form__auth}
                    onSubmit={handleSubmit(deliveryFormAuth)}
                >
                    <h2 className={styles.text__form}>
                    Please create new password:
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
                                    {...register(value as keyof InputsReset)}
                                    aria-invalid={
                                        errors[value as keyof InputsReset]
                                            ? "true"
                                            : "false"
                                    }
                                    placeholder={"Enter your " + value}
                                    type="value"
                                    style={{
                                        border:
                                            errors[
                                                value as keyof InputsReset
                                            ] &&
                                            !formStateValid[
                                                value as keyof InputsReset
                                            ]
                                                ? "1px solid red"
                                                : formStateValid[
                                                      value as keyof InputsReset
                                                  ] &&
                                                  !errors[
                                                      value as keyof InputsReset
                                                  ]
                                                ? "1px solid green"
                                                : !formStateValid[
                                                      value as keyof InputsReset
                                                  ] &&
                                                  !errors[
                                                      value as keyof InputsReset
                                                  ] &&
                                                  formStateFocus[
                                                      value as keyof InputsReset
                                                  ] &&
                                                  formStateValue[
                                                      value as keyof InputsReset
                                                  ].length > 0
                                                ? "1px solid var(--button-up)"
                                                : "1px solid var(--gray)",
                                    }}
                                    className={styles.input__auth}
                                    onChange={(e) =>
                                        onChange(e, value as keyof InputsReset)
                                    }
                                    onFocus={() =>
                                        onFocusInput(value as keyof InputsReset)
                                    }
                                />
                                {!errors[value as keyof InputsReset] &&
                                    formStateValid[
                                        value as keyof InputsReset
                                    ] && (
                                        <IconOkey
                                            className={styles.okey__auth}
                                        />
                                    )}
                                {formStateFocus[value as keyof InputsReset] &&
                                    !formStateValid[
                                        value as keyof InputsReset
                                    ] &&
                                    !errors[value as keyof InputsReset] &&
                                    formStateValue[value as keyof InputsReset]
                                        .length > 0 && (
                                        <div className={styles.focus__block}>
                                            <p>{value as keyof InputsReset}</p>
                                        </div>
                                    )}
                                {errors[value as keyof InputsReset] &&
                                    !formStateValid[
                                        value as keyof InputsReset
                                    ] && (
                                        <p className={styles.text__error}>
                                            {
                                                errors[
                                                    value as keyof InputsReset
                                                ]?.message
                                            }
                                        </p>
                                    )}
                                {errors[value as keyof InputsReset] &&
                                    !formStateValid[
                                        value as keyof InputsReset
                                    ] && (
                                        <Error className={styles.error__auth} />
                                    )}
                            </label>
                        );
                    })}
                    <div className={styles.wrapper__buttons}>
                        <button type="submit" className={styles.button__next}>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
