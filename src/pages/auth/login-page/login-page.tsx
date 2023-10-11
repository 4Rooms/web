import styles from "../auth-context/sign/Sign.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Error, IconOkey } from "../../../assets/icons.tsx";
import {
    InputLoginKeys,
    InputsLogin,
    InputsValidLogin,
} from "../../../App.types.ts";
import React, { useContext, useRef, useState } from "react";
import GoogleAuthButton from "../../../shared/google-auth-button/google-auth-button.tsx";
import { AuthContext } from "../auth-context/auth-context.tsx";
import AuthWrapper from "../../../shared/auth-wrapper/auth-wrapper.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginSchema from "./login-schema.ts";
import useValidation from "../../../shared/use-validate/use-validate.tsx";
import authSchema from "../signup-page/signup-schema.ts";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import AuthInput from "../../../shared/auth-input/auth-Input.tsx";
import Modal from "../../../Components/Modal/Modal.tsx";
import Button from "../../../shared/button/button.tsx";

export default function LoginPage() {
    const { setUsername } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const inputArray: InputLoginKeys[] = ["username", "password"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const [formStateValue, setFormStateValue] = useState<InputsLogin>({
        username: "",
        password: "",
    });

    const [formStateFocus, setFormStateFocus] = useState<InputsValidLogin>({
        username: false,
        password: false,
    });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<InputsLogin>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(LoginSchema),
    });

    const onFocusInput = (type: keyof InputsValidLogin) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };

    const { formStateValid, validateField } = useValidation<InputsValidLogin>({
        schema: authSchema,
        formSubmitted,
        setError,
        clearErrors,
        initialState: {
            username: false,
            password: false,
        },
    });

    const onClickChangeOpenModal = (): void => {
        setOpenModal((prevOpen): boolean => {
            return !prevOpen;
        });
    };

    const onSubmitModal = () => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            onClickChangeOpenModal();
            navigate("/forgot-password", { state: { from: location } });
        } else {
            console.log("error");
        }
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: InputLoginKeys
    ) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
    };

    const deliveryFormAuth: SubmitHandler<InputsLogin> = async (data) => {
        await authService
            .login(data)
            .then((response) => {
                setUsername(response.user.username);
                localStorageService.set("user", response.user);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <AuthWrapper title={"Authentication"} link={backLinkLocation.current}>
            <form
                className={styles.form__auth}
                onSubmit={handleSubmit(deliveryFormAuth)}
            >
                <GoogleAuthButton />
                <h2 className={styles.text__form}>
                    Or sign in with your username and password:
                </h2>
                {inputArray.map((value) => {
                    return (
                        <label
                            htmlFor={value}
                            className={styles.label__auth}
                            key={value}
                        >
                            <AuthInput<InputLoginKeys, InputsLogin>
                                value={value}
                                register={register}
                                errors={errors}
                                formStateValid={formStateValid}
                                formStateFocus={formStateFocus}
                                formStateValue={formStateValue}
                                onChange={onChange}
                                onFocusInput={onFocusInput}
                            />
                            {!errors[value as keyof InputsLogin] &&
                                formStateValid[value as keyof InputsLogin] && (
                                    <IconOkey className={styles.okey__auth} />
                                )}
                            {formStateFocus[value as keyof InputsLogin] &&
                                !formStateValid[value as keyof InputsLogin] &&
                                !errors[value as keyof InputsLogin] &&
                                formStateValue[value as keyof InputsLogin]
                                    .length > 0 && (
                                    <div className={styles.focus__block}>
                                        <p>{value as keyof InputsLogin}</p>
                                    </div>
                                )}
                            {errors[value as keyof InputsLogin] &&
                                !formStateValid[value as keyof InputsLogin] && (
                                    <p className={styles.text__error}>
                                        {
                                            errors[value as keyof InputsLogin]
                                                ?.message
                                        }
                                    </p>
                                )}
                            {errors[value as keyof InputsLogin] &&
                                !formStateValid[value as keyof InputsLogin] && (
                                    <Error className={styles.error__auth} />
                                )}
                        </label>
                    );
                })}
                {openModal && (
                    <Modal onOpen={onClickChangeOpenModal}>
                        <form>
                            <p className={styles.text__modal}>
                                Enter your email to reset password
                            </p>
                            <я
                                placeholder={"Enter your email"}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                                style={{ marginBottom: 60 }}
                                className={styles.input__auth}
                                type="email"
                            />
                            <button
                                className={styles.button__next}
                                type="button"
                                onClick={onSubmitModal}
                                style={{
                                    fontSize: 16,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                Send
                            </button>
                        </form>
                    </Modal>
                )}
                <div className={styles.wrapper__buttons}>
                    <button
                        type="submit"
                        onClick={() => setFormSubmitted(true)}
                        className={styles.button__next}
                    >
                        Sign in
                    </button>
                    <button
                        onClick={onClickChangeOpenModal}
                        className={styles.button__forgot}
                    >
                        Forgot password
                    </button>
                </div>
            </form>
        </AuthWrapper>
    );
}
