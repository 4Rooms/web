import React, { ChangeEvent, useContext, useState } from "react";
import {
    InputChangeUserDataKeys,
    InputsChangeUserData,
    InputsValidUserChangeData,
} from "../../../App.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import useValidation from "../../../shared/use-validate/use-validate";
import changeDataSchema from "./changeData-schema";
import styles from "./ChangeUserData.module.scss";
import Button from "../../../shared/button/button";
import { AddPhoto, Error, IconOkey } from "../../../assets/icons";
import FormInput from "../../../shared/auth-input/form-Input";
import { useTranslation } from "react-i18next";
import authService from "../../../services/auth/auth.service.tsx";
import Toaster from "../../../shared/toaster/toaster.tsx";
import { AuthContext } from "../../auth/signup-page/auth-context/auth-context.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";

export default function ChangeUserData() {
    const inputArray: InputChangeUserDataKeys[] = [
        "profileUsername",
        "profileEmail",
    ];
    const { userIcon, setUserIcon, setUsername } = useContext(AuthContext);
    const [imageUrl, setImageURL] = useState<string>(userIcon || "");
    const [, setImageError] = useState<null | string>(null);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [formStateValue, setFormStateValue] = useState<InputsChangeUserData>({
        profileUsername: "",
        profileEmail: "",
    });
    const [formStateFocus, setFormStateFocus] =
        useState<InputsValidUserChangeData>({
            profileUsername: false,
            profileEmail: false,
        });
    const [open] = useState<boolean>(false);
    const [endpointsError, setEndpointsError] = useState<string[]>([""]);
    const [showToaster, setShowToaster] = useState(false);
    const { t } = useTranslation("translation");
    const user = localStorageService.get("user");

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<InputsChangeUserData>({
        defaultValues: {
            profileUsername: user.username,
            profileEmail: user.email,
        },
        resolver: yupResolver(changeDataSchema),
    });
    const onFocusInput = (type: keyof InputsValidUserChangeData) => {
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
                authService
                    .updateUserAvatar(e.target.files[0])
                    .then((response) => {
                        setUserIcon(response.data.avatar);
                    })
                    .catch((error) => {
                        setEndpointsError(
                            error.response.data.errors.map(
                                (err: { detail: string }) => err.detail
                            )
                        );
                        setShowToaster(true);
                    });
            }
        }
    };

    const { formStateValid, validateField } =
        useValidation<InputsValidUserChangeData>({
            schema: changeDataSchema,
            formSubmitted,
            setError,
            clearErrors,
            initialState: {
                profileEmail: false,
                profileUsername: false,
            },
        });

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: InputChangeUserDataKeys
    ) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });
        validateField(type, value);
    };
    const deliveryFormAuth: SubmitHandler<InputsChangeUserData> = async (
        data
    ) => {
        try {
            if (data) {
                await authService
                    .updateUserData(data)
                    .then(() => {
                        if (data.profileUsername) {
                            setUsername(data.profileUsername);
                            localStorageService.set("user", {
                                ...user,
                                username: data.profileUsername,
                            });
                        }
                        if (data.profileEmail) {
                            setUsername(data.profileEmail);
                            localStorageService.set("user", {
                                ...user,
                                email: data.profileEmail,
                            });
                        }
                    })
                    .catch((error) => {
                        setEndpointsError(
                            error.response.data.errors.map(
                                (err: { detail: string }) => err.detail
                            )
                        );
                        setShowToaster(true);
                    });
            }
        } catch (error: any) {
            setEndpointsError(error);
            setShowToaster(true);
        }
    };
    return (
        <>
            <div className={styles.reset__container}>
                <form
                    onSubmit={handleSubmit(deliveryFormAuth)}
                    autoComplete="off"
                >
                    <div className={styles.wrapper__photo}>
                        <label>
                            <input type="file" onChange={handleImageChange} />
                            {imageUrl ? (
                                <img
                                    className={styles.reset__user_avatar}
                                    src={imageUrl}
                                    alt="User avatar"
                                />
                            ) : (
                                <AddPhoto />
                            )}
                        </label>
                    </div>
                    {inputArray.map((value) => (
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
                                        <p>{t(`shared.${value}`)}</p>
                                    </div>
                                )}
                        </label>
                    ))}
                    <Button
                        className="accent"
                        type="submit"
                        onClick={() => setFormSubmitted(true)}
                    >
                        {t("my-profile.save")}
                    </Button>
                </form>
            </div>
            <Toaster
                messages={endpointsError}
                isVisible={showToaster}
                onHide={() => setShowToaster(false)}
            />
        </>
    );
}
