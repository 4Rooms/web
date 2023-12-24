import styles from "../../pages/auth/auth-context/sign/Sign.module.scss";
import React from "react";
import {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";
import getInputClass from "./input-style-helper/input-style-helper.ts";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation('translation', { keyPrefix: 'shared' });
    return textarea ? (
        <textarea
            name={value}
            id={String(value)}
            autoComplete="off"
            {...(register && register(value))}
            aria-invalid={errors && errors[value] ? "true" : "false"}
            placeholder={
                value !== "resetEmail"
                    ? t(String(value))
                    : t('default')
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
                        e,
                        value
                    );
                onChangeInputValue &&
                    onChangeInputValue(
                        e,
                        value
                    );
            }}
            onFocus={() => onFocusInput && onFocusInput(value)}
        />
    ) : (
        <input
            name={value}
            id={String(value)}
            autoComplete="off"
            {...(register && register(value))}
            aria-invalid={errors && errors[value] ? "true" : "false"}
            placeholder={
                value === "newPassword"
                  ? t('create new password')
                  : value !== "resetEmail"
                  ? value === "oldPassword"
                    ? t('password')
                    : t(String(value))
                  : t('default')
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
                        e,
                        value
                    );
            }}
            onFocus={() => onFocusInput && onFocusInput(value)}
        />
    );
}
