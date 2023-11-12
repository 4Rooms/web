import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../auth-context.tsx";
import authService from "../../../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../../../services/local-storage/local-storage.ts";
import styles from "../Sign.module.scss";
import {
    Back,
    Error,
    Google,
    HiddenPassword,
    IconOkey,
    OpenPassword,
} from "../../../../../assets/icons.tsx";
import * as yup from "yup";
import { InputsLogin, InputsValidLogin } from "../../../../../App.types.ts";
import Modal from "../../../../../Components/Modal/Modal.tsx";

const authSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, "Name should have at least 1 character")
        .max(20, "Name should not exceed 20 characters")
        .matches(
            /^[a-zA-Zа-яА-Я0-9\s]+$/,
            "Name should contain only letters, digits, and spaces"
        )
        .required("Name is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(128, "Password cannot exceed 128 characters.")
        .matches(
            /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[a-zA-Zа-яА-Я0-9!@#$%^&*()-_=+]+$/,
            "Password must contain at least one letter, one digit, and one special character."
        )
        .required("Password is required."),
});

export default function Login() {
    const { setUsername } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const inputArray: string[] = ["username", "password"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const [formStateValue, setFormStateValue] = useState<InputsLogin>({
        username: "",
        password: "",
    });

    const [formStateValid, setFormStateValid] = useState<InputsValidLogin>({
        username: false,
        password: false,
    });
    const [formStateFocus, setFormStateFocus] = useState<InputsValidLogin>({
        username: false,
        password: false,
    });

    const {
        register,
        handleSubmit,
        /*
        reset,
*/
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<InputsLogin>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(authSchema),
    });

    const onFocusInput = (type: keyof InputsValidLogin) => {
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

    const handleKeyDown = (e: any) => {
        if (e.code === "Escape") {
            onClickChangeOpenModal();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        authSchema
            .validateAt(type, { [type]: value })
            .then(() => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: true,
                });
                if (formSubmitted) {
                    clearErrors(type as keyof InputsLogin);
                }
            })
            .catch((error) => {
                setFormStateValid({
                    ...formStateValid,
                    [type]: false,
                });
                if (formSubmitted) {
                    setError(type as keyof InputsLogin, {
                        message: error.message,
                    });
                }
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

    const deliveryFormAuth: SubmitHandler<InputsLogin> = async (data) => {
        try {
            const response = await authService.login(data);
            setUsername(response.user.username);
            localStorageService.set("user", response.user);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container__auth}>
                <div className={styles.wrapper__title}>
                    <Link to={backLinkLocation.current}>
                        <Back />
                    </Link>
                    <h3 className={styles.title__auth}>Authentication</h3>
                </div>
                <form
                    className={styles.form__auth}
                    onSubmit={handleSubmit(deliveryFormAuth)}
                >
                    <div>
                        <p className={styles.text__google}>
                            Sign in with Google:
                        </p>
                        <Link
                            to={
                                "https://back.4rooms.pro/oauth/login/google-oauth2/?next=" + import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URL
                            }
                        >
                            <button
                                className={styles.button__google}
                                type={"button"}
                            >
                                <Google />
                                Google
                            </button>
                        </Link>
                    </div>
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
                                <input
                                    autoComplete="off"
                                    {...register(value as keyof InputsLogin)}
                                    aria-invalid={
                                        errors[value as keyof InputsLogin]
                                            ? "true"
                                            : "false"
                                    }
                                    placeholder={"Enter your " + value}
                                    type={
                                        value === "password"
                                            ? open
                                                ? "text"
                                                : "password"
                                            : value
                                    }
                                    style={{
                                        border:
                                            errors[
                                                value as keyof InputsLogin
                                            ] &&
                                            !formStateValid[
                                                value as keyof InputsLogin
                                            ]
                                                ? "1px solid red"
                                                : formStateValid[
                                                      value as keyof InputsLogin
                                                  ] &&
                                                  !errors[
                                                      value as keyof InputsLogin
                                                  ]
                                                ? "1px solid green"
                                                : !formStateValid[
                                                      value as keyof InputsLogin
                                                  ] &&
                                                  !errors[
                                                      value as keyof InputsLogin
                                                  ] &&
                                                  formStateFocus[
                                                      value as keyof InputsLogin
                                                  ] &&
                                                  formStateValue[
                                                      value as keyof InputsLogin
                                                  ].length > 0
                                                ? "1px solid var(--button-up)"
                                                : "1px solid var(--gray)",
                                    }}
                                    className={styles.input__auth}
                                    onChange={(e) =>
                                        onChange(e, value as keyof InputsLogin)
                                    }
                                    onFocus={() =>
                                        onFocusInput(value as keyof InputsLogin)
                                    }
                                />
                                {value === "password" &&
                                    formStateValue.password?.length > 0 &&
                                    !errors[value as keyof InputsLogin] &&
                                    !formStateValid[
                                        value as keyof InputsLogin
                                    ] && (
                                        <>
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
                                            <button
                                                type="button"
                                                className={
                                                    styles.forgot__password
                                                }
                                                onClick={onClickChangeOpenModal}
                                            >
                                                Forgot Password?
                                            </button>
                                        </>
                                    )}

                                {!errors[value as keyof InputsLogin] &&
                                    formStateValid[
                                        value as keyof InputsLogin
                                    ] && (
                                        <IconOkey
                                            className={styles.okey__auth}
                                        />
                                    )}
                                {formStateFocus[value as keyof InputsLogin] &&
                                    !formStateValid[
                                        value as keyof InputsLogin
                                    ] &&
                                    !errors[value as keyof InputsLogin] &&
                                    formStateValue[value as keyof InputsLogin]
                                        .length > 0 && (
                                        <div className={styles.focus__block}>
                                            <p>{value as keyof InputsLogin}</p>
                                        </div>
                                    )}
                                {value === "password" &&
                                    errors[value as keyof InputsLogin] &&
                                    !formStateValid[
                                        value as keyof InputsLogin
                                    ] && (
                                        <p className={styles.text__error}>
                                            {
                                                errors[
                                                    value as keyof InputsLogin
                                                ]?.message
                                            }{" "}
                                            <button
                                                type="button"
                                                className={
                                                    styles.forgot__password__error
                                                }
                                                onClick={onClickChangeOpenModal}
                                            >
                                                Forgot Password?
                                            </button>
                                        </p>
                                    )}
                                {value !== "password" &&
                                    errors[value as keyof InputsLogin] &&
                                    !formStateValid[
                                        value as keyof InputsLogin
                                    ] && (
                                        <p className={styles.text__error}>
                                            {
                                                errors[
                                                    value as keyof InputsLogin
                                                ]?.message
                                            }
                                        </p>
                                    )}
                                {errors[value as keyof InputsLogin] &&
                                    !formStateValid[
                                        value as keyof InputsLogin
                                    ] && (
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
                                <input
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
                    </div>
                </form>
            </div>
        </div>
    );
}
