import styles from "../../pages/auth/auth-context/sign/Sign.module.scss";
import React from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import getInputClass from "./input-style-helper/input-style-helper.ts";

interface AuthInput<T extends Path<U>, U extends FieldValues> {
    value: T ;
    register: UseFormRegister<U>;
    errors: FieldErrors<U>;
    formStateValid: Record<string, any>;
    formStateFocus: Record<string, any>;
    formStateValue: Record<string, any>;
    open?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, value: T) => void;
    onFocusInput: (type: T) => void;
}

export default function AuthInput<T extends Path<U>, U extends FieldValues>(
    {
        value,
        register,
        errors,
        formStateValid,
        formStateFocus,
        formStateValue,
        open = false,
        onChange,
        onFocusInput,
    }: AuthInput<T, U>) {
    return <input
        id={String(value)}
        autoComplete="off"
        {...register(value)}
        aria-invalid={errors[value] ? "true" : "false"}
        placeholder={`Enter your ${String(value)}`}
        type={value === "password" ? open ? "text" : "password" : String(value)}
        className={`${styles.input__auth} ${getInputClass(String(value), errors, formStateValid, formStateFocus, formStateValue)}`}
        onChange={(e) => onChange(e, value)}
        onFocus={() => onFocusInput(value)}/>
}
