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
import styles from "./ChangeUserData.module.css";
import Button from "../../../shared/button/button";
import {
    Delete,
    Error,
    HiddenPassword,
    IconOkey,
    OpenPassword,
} from "../../../assets/icons";
import FormInput from "../../../shared/auth-input/form-Input";
import Modal from "../../../Components/Modal/Modal";

export default function ChangeUserData() {
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
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
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
    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
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
        console.log(data);
    };
    return (
        <>
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
                                        <p>
                                            {value !== "oldPassword"
                                                ? "New Password"
                                                : "Old Password"}
                                        </p>
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
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
            <button onClick={() => onClickChangeOpenModal()} className={styles.delete__button}>
                <Delete />
                Delete Account
            </button>
            {openModal && (
                <Modal className="profile" onOpen={onClickChangeOpenModal}>
                    <div className={styles.modal}>
                        <h2>Delete your Account</h2>
                        <p>After this action, you will permanently regain access to your account, chats and messages.</p>
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                            type="submit"
                            className="accent"
                        >
                            Delete
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
}
