import React, { ChangeEvent, useState } from "react";
import styles from "./CreateChat.module.scss";
import Modal from "../../../../Components/Modal/Modal";
import { AddPhoto, Error, IconOkey } from "../../../../assets/icons";
import Button from "../../../../shared/button/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    InputsCreate,
    InputsCreateKeys,
    InputsCreateValid,
} from "../../../../App.types";
import { yupResolver } from "@hookform/resolvers/yup";
import useValidation from "../../../../shared/use-validate/use-validate";
import FormInput from "../../../../shared/auth-input/form-Input";
import { useChat } from "../../../chats/chat-context/use-chat.tsx";
import createSchema from "./create-schema.tsx";
import { createChat } from "../../../../services/chat/chat.service.tsx";
import { useTranslation } from "react-i18next";

export default function CreateChat() {
    const { t } = useTranslation("translation", { keyPrefix: "welcome" });

    const { roomName, roomsList, setRoomsList } = useChat();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const inputArray: InputsCreateKeys[] = ["title", "description"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string>("");
    const [image, setImage] = useState<File>();

    const [formStateValue, setFormStateValue] = useState<InputsCreate>({
        title: "",
        description: "",
    });
    const [formStateFocus, setFormStateFocus] = useState<InputsCreateValid>({
        title: false,
        description: false,
    });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
        },
        resolver: yupResolver(createSchema),
    });

    const onFocusInput = (type: keyof InputsCreateValid) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };
    const { formStateValid, validateField } = useValidation<InputsCreateValid>({
        schema: createSchema,
        formSubmitted,
        setError,
        clearErrors,
        initialState: {
            title: false,
            description: false,
        },
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement> | null) => {
        if (e && e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImageURL(URL.createObjectURL(file));
            setImage(file);
        }
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: InputsCreateKeys
    ) => {
        const value = e.target.value;
        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
    };

    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
            return !prevOpen;
        });
    };

    const deliveryFormAuth: SubmitHandler<InputsCreate> = async (data) => {
        console.log(21321321)
        const formData = new FormData();
        const chatOptions = {
            ...data,
            img: image,
        };
        for (const key in chatOptions) {
            if (chatOptions[key as keyof typeof chatOptions] !== undefined) {
                formData.append(
                    key,
                    chatOptions[key as keyof typeof chatOptions] as string | Blob
                );
            }
        }    
        const newData = await createChat(roomName, formData);
        if (newData.name !== "AxiosError") {
            setRoomsList([newData.chat, ...(roomsList || [])]);
        }
        setImageURL("");
        setOpenModal(false);
    };

    return (
        <>
            <button
                onClick={onClickChangeOpenModal}
                className={`${styles.button__addChat} ${
                    roomName ? styles[roomName] : ""
                }`}
            >
                {t("createChat")}
            </button>
            {openModal && (
                <Modal className="create__chat" onOpen={onClickChangeOpenModal}>
                    <>
                        <h1 className={styles.title__modal}>
                            Create a new chat
                        </h1>
                        <form
                            onSubmit={handleSubmit(deliveryFormAuth)}
                            className={styles.form__auth}
                        >
                            <div className={styles.wrapper__add}>
                                <label className={styles.label__auth}>
                                    <input
                                        className={styles.add__image}
                                        type="file"
                                        onChange={handleImageChange}
                                        required
                                    />
                                    {!imageURL && <AddPhoto />}
                                    {imageURL && (
                                        <img
                                            className={styles.user__img}
                                            src={imageURL}
                                        />
                                    )}
                                </label>
                            </div>
                            {inputArray.map((value) => (
                                <label
                                    className={styles.label__auth}
                                    key={value}
                                    htmlFor={value}
                                >
                                    <FormInput<InputsCreateKeys, InputsCreate>
                                        value={value}
                                        register={register}
                                        errors={errors}
                                        formStateValid={formStateValid}
                                        formStateFocus={formStateFocus}
                                        formStateValue={formStateValue}
                                        onChange={onChange}
                                        textarea={value === "description"}
                                        className={
                                            value === "description"
                                                ? "textarea"
                                                : "create"
                                        }
                                        onFocusInput={onFocusInput}
                                    />
                                    {!errors[value as keyof InputsCreate] &&
                                        formStateValid[
                                            value as keyof InputsCreate
                                        ] && (
                                            <IconOkey
                                                className={styles.okey__auth}
                                            />
                                        )}
                                    {formStateFocus[
                                        value as keyof InputsCreate
                                    ] &&
                                        !formStateValid[
                                            value as keyof InputsCreate
                                        ] &&
                                        !errors[value as keyof InputsCreate] &&
                                        formStateValue[
                                            value as keyof InputsCreate
                                        ].length > 0 && (
                                            <div
                                                className={styles.focus__block}
                                            >
                                                <p>
                                                    {
                                                        value as keyof InputsCreate
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    {errors[value] &&
                                        !formStateValid[value] && (
                                            <>
                                                <p
                                                    className={
                                                        styles.text__error
                                                    }
                                                >
                                                    {errors[value]?.message}
                                                </p>
                                                <Error
                                                    className={
                                                        styles.error__auth
                                                    }
                                                />
                                            </>
                                        )}
                                </label>
                            ))}
                            <Button
                                onClick={() => {
                                    setFormSubmitted(true);
                                }}
                                type="submit"
                                className="accent"
                            >
                                Create
                            </Button>
                        </form>
                    </>
                </Modal>
            )}
        </>
    );
}
