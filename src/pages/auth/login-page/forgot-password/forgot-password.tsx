import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../auth.module.css";
import {
    ForgotKeys,
    InputsReset,
    InputsValidReset,
} from "../../../../App.types.ts";
import { Error, IconOkey } from "../../../../assets/icons.tsx";
import AuthWrapper from "../../../../shared/auth-wrapper/auth-wrapper.tsx";
import forgotSchema from "./forgot-schema.tsx";
import useValidation from "../../../../shared/use-validate/use-validate.tsx";
import FormInput from "../../../../shared/auth-input/form-Input.tsx";
import Button from "../../../../shared/button/button.tsx";

export default function ForgotPassword() {
    const inputArray: string[] = ["password"];
    const location = useLocation();
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const [formStateValue, setFormStateValue] = useState<InputsReset>({
        password: "",
    });

    const [formStateFocus, setFormStateFocus] = useState<InputsValidReset>({
        password: false,
    });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<InputsReset>({
        defaultValues: {
            password: "",
        },
        resolver: yupResolver(forgotSchema),
    });

    const { formStateValid, validateField } = useValidation<InputsValidReset>({
        schema: forgotSchema,
        formSubmitted,
        setError,
        clearErrors,
        initialState: {
            password: false,
        },
    });

    const onFocusInput = (type: keyof InputsValidReset) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: ForgotKeys
    ) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
    };

    const deliveryFormAuth: SubmitHandler<InputsReset> = async (data) => {
        // const response = await authService.signup(data);
        // localStorageService.set("user", response);
        console.log(data);
        navigate("/");
    };

    return (
        <AuthWrapper title={"Forgot password"} link={backLinkLocation.current}>
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
                            key={value}>
                            <FormInput<"password", InputsReset>
                                value="password"
                                register={register}
                                errors={errors}
                                formStateValid={formStateValid}
                                formStateFocus={formStateFocus}
                                formStateValue={formStateValue}
                                onChange={onChange}
                                onFocusInput={onFocusInput}
                            />
                            {!errors[value as keyof InputsReset] &&
                                formStateValid[value as keyof InputsReset] && (
                                    <IconOkey className={styles.okey__auth} />
                                )}
                            {formStateFocus[value as keyof InputsReset] &&
                                !formStateValid[value as keyof InputsReset] &&
                                !errors[value as keyof InputsReset] &&
                                formStateValue[value as keyof InputsReset]
                                    .length > 0 && (
                                    <div className={styles.focus__block}>
                                        <p>{value as keyof InputsReset}</p>
                                    </div>
                                )}
                            {errors[value as keyof InputsReset] &&
                                !formStateValid[value as keyof InputsReset] &&
                                value !== "password" && (
                                    <p className={styles.text__error}>
                                        {
                                            errors[value as keyof InputsReset]
                                                ?.message
                                        }
                                    </p>
                                )}
                            {errors[value as keyof InputsReset] &&
                                !formStateValid[value as keyof InputsReset] && (
                                    <Error className={styles.error__auth} />
                                )}
                        </label>
                    );
                })}
                <div className={styles.wrapper__buttons}>
                    <Button
                        type="submit"
                        className="accent"
                        onClick={() => setFormSubmitted(true)}
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </AuthWrapper>
    );
}
