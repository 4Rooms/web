import styles from "../../pages/auth/auth-context/sign/Sign.module.scss";
import React from "react";
import {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";
import getInputClass from "./input-style-helper/input-style-helper.ts";

interface FormInput<T extends Path<U>, U extends FieldValues> {
    value: T;
    register?: UseFormRegister<U>;
    errors?: FieldErrors<U>;
    formStateValid?: Record<string, any>;
    formStateFocus?: Record<string, any>;
    formStateValue?: Record<string, any>;
    open?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: T) => void;
    onChangeInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocusInput?: (type: T) => void;
}

export default function FormInput<T extends Path<U>, U extends FieldValues>({
    value,
    register,
    errors,
    formStateValid,
    formStateFocus,
    formStateValue,
    open = false,
    onChange,
    onFocusInput,
    onChangeInputValue
}: FormInput<T, U>) {
    return (
        <input
            id={String(value)}
            autoComplete="off"
            {...(register && register(value))}
            aria-invalid={errors && errors[value] ? "true" : "false"}
            placeholder={value !== "resetEmail" ? `Enter your ${String(value)}` : "Enter your email"}
            type={
                value === "password"
                    ? open
                        ? "text"
                        : "password"
                    : String(value)
            }
            className={`${styles.input__auth} ${getInputClass(
                String(value),
                errors || {},
                formStateValid || {},
                formStateFocus || {},
                formStateValue || {}
            )}`}
            onChange={(e) => {
                onChange && onChange(e, value);
                onChangeInputValue && onChangeInputValue(e);
            }}
            onFocus={() => onFocusInput && onFocusInput(value)}
        />
    );
}
