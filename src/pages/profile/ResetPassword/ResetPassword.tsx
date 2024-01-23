import React, { useState } from "react";
import {
    InputResetPasswordKeys,
    InputsResetPassword,
    InputsValidResetPassword,
} from "../../../App.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import useValidation from "../../../shared/use-validate/use-validate";
import resetPasswordSchema from "./resetPassword-schema";
import styles from "./ResetPassword.module.css";
import Button from "../../../shared/button/button";
import {
    Error,
    HiddenPassword,
    IconOkey,
    OpenPassword,
} from "../../../assets/icons";
import FormInput from "../../../shared/auth-input/form-Input";
import { useTranslation } from "react-i18next";
import authService from "../../../services/auth/auth.service.tsx";
import { useChat } from "../../chats/chat-context/use-chat.tsx";

export default function ResetPassword() {
    const inputArray: InputResetPasswordKeys[] = ["oldPassword", "newPassword"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [formStateValue, setFormStateValue] = useState<InputsResetPassword>({
        oldPassword: "",
        newPassword: "",
    });
    const [formStateFocus, setFormStateFocus] =
        useState<InputsValidResetPassword>({
            oldPassword: false,
            newPassword: false,
        });
    const [open, setOpen] = useState<boolean>(false);
    const { setToasterMessage, setShowToaster } = useChat();
    const { t } = useTranslation("translation");

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm<InputsResetPassword>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
        resolver: yupResolver(resetPasswordSchema),
    });
    const onFocusInput = (type: keyof InputsValidResetPassword) => {
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

    const { formStateValid, validateField } =
        useValidation<InputsValidResetPassword>({
            schema: resetPasswordSchema,
            formSubmitted,
            setError,
            clearErrors,
            initialState: {
                oldPassword: false,
                newPassword: false,
            },
        });

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: InputResetPasswordKeys
    ) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
    };
    const deliveryFormAuth: SubmitHandler<InputsResetPassword> = async (
        data
    ) => {
        const newData = {
            old_password: data.oldPassword,
            new_password: data.newPassword,
        };
        setFormSubmitted(true);
        try {
            await authService.changePassword(newData);
            reset();
            setToasterMessage(["Password updated successfully"]);
            setShowToaster(true);
        } catch (e) {
            setToasterMessage(["Wrong old password"]);
            setShowToaster(true);
        }
    };
    return (
        <>
            <p className={styles.reset__warning}>
                {t("my-profile.change-password-description")}
            </p>
            <div className={styles.reset__container}>
                <form onSubmit={handleSubmit(deliveryFormAuth)}>
                    {inputArray.map((value) => (
                        <label htmlFor={value} key={value}>
                            <FormInput<
                                InputResetPasswordKeys,
                                InputsResetPassword
                            >
                                value={value}
                                register={register}
                                errors={errors}
                                formStateValid={formStateValid}
                                formStateFocus={formStateFocus}
                                formStateValue={formStateValue}
                                open={open}
                                className="reset"
                                onChange={onChange}
                                onFocusInput={onFocusInput}
                            />

                            {!errors[value] && formStateValid[value] && (
                                <IconOkey className={styles.okey} />
                            )}

                            {value === "newPassword" &&
                                formStateValue.newPassword?.length > 0 &&
                                !errors[value] &&
                                !formStateValid[value] && (
                                    <button
                                        className={styles.button__show}
                                        type="button"
                                        onClick={onClickChangeOpen}
                                    >
                                        {open ? (
                                            <OpenPassword />
                                        ) : (
                                            <HiddenPassword />
                                        )}
                                    </button>
                                )}

                            {formStateFocus[value] &&
                                !formStateValid[value] &&
                                !errors[value] &&
                                formStateValue[value].length > 0 && (
                                    <div className={styles.focus}>
                                        <p>{t(`shared.${value}`)}</p>
                                    </div>
                                )}

                            {errors[value] && !formStateValid[value] && (
                                <>
                                    <p className={styles.text__error}>
                                        {errors[value]?.message}
                                    </p>
                                    <Error className={styles.error} />
                                </>
                            )}
                        </label>
                    ))}
                    <div className={styles.wrapper__buttons}>
                        <Button
                            className="accent"
                            type="submit"
                            onClick={() => setFormSubmitted(true)}
                        >
                            {t("save")}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
