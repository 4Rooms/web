import React, { ChangeEvent, useState } from "react";
import styles from "./BlockNotificationSaved.module.css";
import { AddPhoto, Error, IconOkey, Like } from "../../assets/icons";
import { useChat } from "../../pages/chats/chat-context/use-chat";
import {
    InputsCreate,
    InputsCreateKeys,
    InputsCreateValid,
} from "../../App.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createSchema from "../../pages/Chats/PanelGroups/CreateChat/create-schema";
import useValidation from "../../shared/use-validate/use-validate";
import { createChat, updateCreateChat } from "../../services/chat/chat.service";
import Modal from "../Modal/Modal";
import FormInput from "../../shared/auth-input/form-Input";
import Button from "../../shared/button/button";

export default function BlockNotificationSaved({
    open,
    img = "",
    text = "",
    title = "",
    likes,
    time,
    changeOpen,
    id,
}: {
    img: string;
    text: string;
    title: string;
    likes: number;
    time: string;
    open: boolean;
    changeOpen: () => void;
    id: number
}) {
    const { setFilterCreate } = useChat();
    const inputArray: InputsCreateKeys[] = ["title", "description"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string>(img);
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
        reset,
    } = useForm({
        defaultValues: {
            title: title,
            description: text,
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

    const deliveryFormAuth: SubmitHandler<InputsCreate> = async (data) => {
        const formData = new FormData();
        const chatOptions = {
            ...data,
            img: image,
        };
        for (const key in chatOptions) {
            if (chatOptions[key as keyof typeof chatOptions] !== undefined) {
                formData.append(
                    key,
                    chatOptions[key as keyof typeof chatOptions] as
                        | string
                        | Blob
                );
            }
        }
        const newData = await updateCreateChat(id, formData);
        if (newData.name !== "AxiosError") {
            setFilterCreate(prevState => {
                return prevState.map((chat) => {
                    if (chat.id === newData.id) {
                        return newData;
                    }
                    return chat;
                });
            });
        }
        reset();
        setImageURL("");
        changeOpen();
    };
    const cutTextFunction = (text: string) => {
        let modifiedText = "";

        if (text?.length > 15) {
            modifiedText = text.substring(0, 10);
        } else {
            modifiedText = text;
        }
        return modifiedText;
    };
    return (
        <>
            <div className={styles.block}>
                <div className={styles.block__up}>
                    <img src={img} />
                    <h2>{title}</h2>
                </div>
                <p>{text}</p>
                <div className={styles.block__below}>
                    <span>{cutTextFunction(time)}</span>
                    <div>
                        <div>
                            {likes}
                            <Like />
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <Modal className="create__chat" onOpen={changeOpen}>
                    <>
                        <h1 className={styles.title__modal}>
                            Edit your chat
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
                                Save
                            </Button>
                        </form>
                    </>
                </Modal>
            )}
        </>
    );
}
