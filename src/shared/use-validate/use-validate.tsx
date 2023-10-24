import { useState } from "react";
import { ValidationError } from "yup";
import LoginSchema from "../../pages/auth/login-page/login-schema.ts";
import SignupSchema from "../../pages/auth/signup-page/signup-schema.ts";
import ForgetSchema from './../../pages/auth/login-page/forgot-password/forgot-schema.tsx';
import createSchema from "../../pages/Chats/PanelGroups/CreateChat/create-schema.tsx";

type ValidationProps<T> = {
    schema: typeof LoginSchema | typeof SignupSchema | typeof ForgetSchema | typeof createSchema;
    formSubmitted: boolean;
    setError: (name: keyof T, error: { message: string }) => void;
    clearErrors: (name: keyof T) => void;
    initialState: T;
};

export default function useValidation<T>(
    {
        schema,
        formSubmitted,
        setError,
        clearErrors,
        initialState
    }: ValidationProps<T>) {
    const [formStateValid, setFormStateValid] = useState<T>(initialState);

    const validateField = (type: keyof T, value: string) => {
        schema
            .validateAt(type as string, {[type]: value})
            .then(() => {
                setFormStateValid(prevState => ({
                    ...prevState,
                    [type]: true,
                }));
                if (formSubmitted) {
                    clearErrors(type);
                }
            })
            .catch((error: ValidationError) => {
                setFormStateValid(prevState => ({
                    ...prevState,
                    [type]: false,
                }));
                if (formSubmitted) {
                    setError(type, {
                        message: error.message,
                    });
                }
            });
    };

    return {formStateValid, validateField};
}
