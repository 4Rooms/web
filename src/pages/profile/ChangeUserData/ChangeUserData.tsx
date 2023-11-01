import React, { ChangeEvent, useState } from "react";
import {
    InputChangeDataKeys,
    InputsChangeData,
    InputsValidChangeData,
} from "../../../App.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import useValidation from "../../../shared/use-validate/use-validate";
import changeDataSchema from "./changeData-schema";
import styles from "./ChangeUserData.module.css";
import Button from "../../../shared/button/button";
import {
    AddPhoto,
    Delete,
    Error,
    IconOkey,
} from "../../../assets/icons";
import FormInput from "../../../shared/auth-input/form-Input";
import Modal from "../../../Components/Modal/Modal";

export default function ChangeUserData() {
    const inputArray: InputChangeDataKeys[] = ["username", "email"];
    const [, setImageURL] = useState<string>("");
    const [, setImageError] = useState<null | string>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [formStateValue, setFormStateValue] = useState<InputsChangeData>({
        username: "",
        email: "",
    });
    const [formStateFocus, setFormStateFocus] = useState<InputsValidChangeData>(
        {
            username: false,
            email: false,
        }
    );
    const [open, setOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<InputsChangeData>({
        defaultValues: {
            username: "",
            email: "",
        },
        resolver: yupResolver(changeDataSchema),
    });
    const onFocusInput = (type: keyof InputsValidChangeData) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };
    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
            return !prevOpen;
        });
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement> | null) => {
        if (e && e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.size > 3 * 1024 * 1024) {
                setImageError("Image size should be less than 3MB");
            } else {
                setImageError(null);
                setImageURL(URL.createObjectURL(file));
            }
        }
    };

    const { formStateValid, validateField } =
        useValidation<InputsValidChangeData>({
            schema: changeDataSchema,
            formSubmitted,
            setError,
            clearErrors,
            initialState: {
                email: false,
                username: false,
            },
        });

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: InputChangeDataKeys
    ) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
    };
    const deliveryFormAuth: SubmitHandler<InputsChangeData> = async (data) => {
        console.log(data);
    };
    return (
        <>
            <div className={styles.reset__container}>
                <form onSubmit={handleSubmit(deliveryFormAuth)}>
                    <div>
                        <label className={styles.label__auth}>
                            <input
                                className={styles.add__image}
                                type="file"
                                onChange={handleImageChange}
                                required
                            />
                            <AddPhoto />
                        </label>
                    </div>
                    {inputArray.map((value) => (
                        <label htmlFor={value} key={value}>
                            <FormInput<InputChangeDataKeys, InputsChangeData>
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

                            {errors[value] && !formStateValid[value] && (
                                <>
                                    <p className={styles.text__error}>
                                        {errors[value]?.message}
                                    </p>
                                    <Error className={styles.error} />
                                </>
                            )}
                            {formStateFocus[value] &&
                                !formStateValid[value] &&
                                !errors[value] &&
                                formStateValue[value].length > 0 && (
                                    <div className={styles.focus}>
                                        <p>{value}</p>
                                    </div>
                                )}
                        </label>
                    ))}
                    <Button
                        className="accent"
                        type="submit"
                        onClick={() => setFormSubmitted(true)}
                    >
                        Sign in
                    </Button>
                </form>
            </div>
            <button
                onClick={() => onClickChangeOpenModal()}
                className={styles.delete__button}
            >
                <Delete />
                Delete Account
            </button>
            {openModal && (
                <Modal className="profile" onOpen={onClickChangeOpenModal}>
                    <div className={styles.modal}>
                        <h2>Delete your Account</h2>
                        <p>
                            After this action, you will permanently regain
                            access to your account, chats and messages.
                        </p>
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
