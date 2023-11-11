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
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: T
    ) => void;
    onChangeInputValue?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: T
    ) => void;
    onFocusInput?: (type: T) => void;
    className?: string | undefined;
    textarea?: boolean;
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
    onChangeInputValue,
    className = "",
    textarea = false,
}: FormInput<T, U>) {
    return textarea ? (
        <textarea
            id={String(value)}
            autoComplete="off"
            {...(register && register(value))}
            aria-invalid={errors && errors[value] ? "true" : "false"}
            placeholder={
                value !== "resetEmail"
                    ? `Enter your ${String(value)}`
                    : "Enter your email"
            }
            className={`${styles.input__auth} ${getInputClass(
                String(value),
                errors || {},
                formStateValid || {},
                formStateFocus || {},
                formStateValue || {}
            )} ${styles[className]}`}
            onChange={(e) => {
                onChange &&
                    onChange(
                        e as React.ChangeEvent<HTMLTextAreaElement>,
                        value
                    );
                onChangeInputValue &&
                    onChangeInputValue(
                        e as React.ChangeEvent<HTMLTextAreaElement>,
                        value
                    );
            }}
            onFocus={() => onFocusInput && onFocusInput(value)}
        />
    ) : (
        <input
            id={String(value)}
            autoComplete="off"
            {...(register && register(value))}
            aria-invalid={errors && errors[value] ? "true" : "false"}
            placeholder={
                value === "newPassword"
                  ? "Enter your new password"
                  : value !== "resetEmail"
                  ? value === "oldPassword"
                    ? "Confirm your old password"
                    : `Enter your ${String(value)}`
                  : "Enter your email"
              }
              
            type={
                value === "password" || value === "newPassword"
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
            )} ${styles[className]}`}
            onChange={(e) => {
                onChange && onChange(e, value);
                onChangeInputValue &&
                    onChangeInputValue(
                        e as React.ChangeEvent<HTMLInputElement>,
                        value
                    );
            }}
            onFocus={() => onFocusInput && onFocusInput(value)}
        />
    );
}
