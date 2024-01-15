import React, { ChangeEvent, useEffect, useState } from "react";
import BasedNotificationSaved from "../../Components/BasedNotificationSaved/BasedNotificationSaved";
import BlockNotificationSaved from "../../Components/BlockNotificationSaved/BlockNotificationSaved";
import { AddPhoto, Edit, Error, IconOkey } from "../../assets/icons";
import styles from "./MyChats.module.css";
import { useChat } from "../chats/chat-context/use-chat";
import { useTranslation } from "react-i18next";
import { updateCreateChat } from "../../services/chat/chat.service";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    InputsCreate,
    InputsCreateKeys,
    InputsCreateValid,
} from "../../App.types";
import mySchema from "./my-schema";
import useValidation from "../../shared/use-validate/use-validate";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../shared/button/button";
import FormInput from "../../shared/auth-input/form-Input";
import Modal from "../../Components/Modal/Modal";

export default function MyChats() {
    const { t } = useTranslation("translation");
    const [open, setOpen] = useState({
        open: false,
        title: "",
        description: "",
        image: "",
        id: 0,
    });
    const { filterCreate } = useChat();
    const { setFilterCreate } = useChat();
    const inputArray: InputsCreateKeys[] = ["title", "description"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string | undefined>(open?.image);
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
        setValue
    } = useForm({
        defaultValues: {
            title: open?.title,
            description: open?.description,
        },
        resolver: yupResolver(mySchema),
    });

    const onFocusInput = (type: keyof InputsCreateValid) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };
    const { formStateValid, validateField } = useValidation<InputsCreateValid>({
        schema: mySchema,
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

    const changeOpen = (
        title: string,
        description: string,
        image: string,
        id: number
    ) => {
        setOpen((prevState) => ({
            open: !prevState.open,
            title,
            description,
            image,
            id,
        }));
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

        setValue(type, value);

        validateField(type, value);
    };

    const deliveryFormAuth: SubmitHandler<{
        title?: string;
        description?: string;
    }> = async (data) => {
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
        const newData = await updateCreateChat(open.id, formData);
        if (newData.name !== "AxiosError") {
            setFilterCreate((prevState) => {
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
        if (setOpen) {
            setOpen((prevState) => {
                return { ...prevState, open: false };
            });
        }
    };

    useEffect(() => {
        reset({
            title: open?.title,
            description: open?.description,
        });

        setImageURL(open?.image || "");

        setFormSubmitted(false);
    }, [open, reset]);

    return (
        <BasedNotificationSaved title={t("my-chart.page-title")}>
            {filterCreate.map((chat) => {
                return (
                    <li key={chat.id} className={styles.item}>
                        <BlockNotificationSaved
                            room={chat.room}
                            id={chat.id}
                            time={chat.timestamp}
                            title={chat.title}
                            likes={chat.likes}
                            text={chat.description}
                            img={chat.img}
                        />
                        <button
                            onClick={() =>
                                changeOpen(
                                    chat.title,
                                    chat.description,
                                    chat.img,
                                    chat.id
                                )
                            }
                        >
                            <Edit />
                        </button>
                        {open?.open && (
                            <Modal
                                className="create__chat"
                                onOpen={
                                    setOpen
                                        ? () =>
                                              setOpen((prevState) => ({
                                                  ...prevState,
                                                  open: false,
                                              }))
                                        : () => console.log("Default action")
                                }
                            >
                                <>
                                    <h1 className={styles.title__modal}>
                                        Edit your chat
                                    </h1>
                                    <form
                                        onSubmit={handleSubmit(
                                            deliveryFormAuth
                                        )}
                                        className={styles.form__auth}
                                    >
                                        <div className={styles.wrapper__add}>
                                            <label
                                                className={styles.label__auth}
                                            >
                                                <input
                                                    className={
                                                        styles.add__image
                                                    }
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                                {!imageURL && <AddPhoto />}
                                                {imageURL && (
                                                    <img
                                                        className={
                                                            styles.user__img
                                                        }
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
                                                <FormInput<
                                                    InputsCreateKeys,
                                                    {
                                                        title?: string;
                                                        description?: string;
                                                    }
                                                >
                                                    value={value}
                                                    register={register}
                                                    errors={errors}
                                                    formStateValid={
                                                        formStateValid
                                                    }
                                                    formStateFocus={
                                                        formStateFocus
                                                    }
                                                    formStateValue={
                                                        formStateValue
                                                    }
                                                    onChange={onChange}
                                                    edit={true}
                                                    textarea={
                                                        value === "description"
                                                    }
                                                    className={
                                                        value === "description"
                                                            ? "textarea"
                                                            : "create"
                                                    }
                                                    onFocusInput={onFocusInput}
                                                />
                                                {!errors[
                                                    value as keyof InputsCreate
                                                ] &&
                                                    formStateValid[
                                                        value as keyof InputsCreate
                                                    ] && (
                                                        <IconOkey
                                                            className={
                                                                styles.okey__auth
                                                            }
                                                        />
                                                    )}
                                                {formStateFocus[
                                                    value as keyof InputsCreate
                                                ] &&
                                                    !formStateValid[
                                                        value as keyof InputsCreate
                                                    ] &&
                                                    !errors[
                                                        value as keyof InputsCreate
                                                    ] &&
                                                    formStateValue[
                                                        value as keyof InputsCreate
                                                    ].length > 0 && (
                                                        <div
                                                            className={
                                                                styles.focus__block
                                                            }
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
                                                                {
                                                                    errors[
                                                                        value
                                                                    ]?.message
                                                                }
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
                    </li>
                );
            })}
        </BasedNotificationSaved>
    );
}
