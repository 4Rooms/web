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
import { AddPhoto, Edit, Error, IconOkey } from "../../../assets/icons";
import FormInput from "../../../shared/auth-input/form-Input";
import { useTranslation } from "react-i18next";

export default function ChangeUserData() {
    const inputArray: InputChangeDataKeys[] = ["username", "email"];
    const [, setImageURL] = useState<string>("");
    const [, setImageError] = useState<null | string>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [openInput, setOpenInput] = useState<InputsValidChangeData>({
        username: false,
        email: false,
    });
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
    const [open] = useState<boolean>(false);
    const { t } = useTranslation('translation');

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
        setOpenInput({
            username: false,
            email: false,
        });
    };
    return (
        <>
            <div className={styles.reset__container}>
                <form onSubmit={handleSubmit(deliveryFormAuth)}>
                    <div className={styles.wrapper__photo}>
                        <label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                            />
                            <AddPhoto />
                        </label>
                    </div>
                    {inputArray.map((value) =>
                        openInput[value] ? (
                            <label htmlFor={value} key={value}>
                                <FormInput
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
                        ) : (
                            <div
                            className={`${styles.data__user} ${value === "email" ? `${styles.data__user_last}` : ""}`}
                                key={value}
                            >
                                <div>
                                    <p>
                                        {t(`shared.${value}`)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setOpenInput((prevState) => ({
                                            ...prevState,
                                            [value]: true,
                                        }));
                                    }}
                                    type="button"
                                    className={styles.edit__button}
                                >
                                    <Edit />
                                </button>
                            </div>
                        )
                    )}
                    <Button
                        className="accent"
                        type="submit"
                        onClick={() => setFormSubmitted(true)}
                    >
                        {t('my-profile.save')}
                    </Button>
                </form>
            </div>
        </>
    );
}
