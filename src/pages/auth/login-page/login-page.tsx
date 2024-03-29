import styles from "../auth.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Error, HiddenPassword, IconOkey, OpenPassword } from "../../../assets/icons.tsx";
import {
    InputLoginKeys,
    InputsLogin,
    InputsValidLogin,
    ResetEmail,
    ResetEmailKeys,
} from "../../../App.types.ts";
import React, { useContext, useRef, useState } from "react";
import GoogleAuthButton from "../../../shared/google-auth-button/google-auth-button.tsx";
import { AuthContext } from "../signup-page/auth-context/auth-context.tsx";
import AuthWrapper from "../../../shared/auth-wrapper/auth-wrapper.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useValidation from "../../../shared/use-validate/use-validate.tsx";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import FormInput from "../../../shared/auth-input/form-Input.tsx";
import Modal from "../../../Components/Modal/Modal.tsx";
import Button from "../../../shared/button/button.tsx";
import loginSchema from "./login-schema.ts";
import Toaster from "../../../shared/toaster/toaster.tsx";
import { useTranslation } from "react-i18next";
import { ISchema, reach } from 'yup';
import debounce from "../../../utils/debounce/debounce.ts";

export default function LoginPage() {
    const { t } = useTranslation('translation');

    const allFieldsValid = () => {
        return Object.values(formStateValid).every(value => value);
    };
    const {setUsername, setIsAuthenticated, setUserIcon} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const [open, setOpen] = useState<boolean>(false);
    const inputArray: InputLoginKeys[] = ["username", "password"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let resetEmail: string = "";
    const [endpointsError, setEndpointsError] = useState<string[]>([''])
    const [showToaster, setShowToaster] = useState(false);

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
        formState: {errors},
    } = useForm<InputsLogin>({
        mode: 'onChange',
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });


    const onFocusInput = (type: keyof InputsValidLogin) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };
    const onMouseLeaveInput = (type: keyof InputsValidLogin) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: false,
        }));

    };

    const onClickChangeOpen = (): void => {
        setOpen((prevOpen): boolean => {
            return !prevOpen;
        });
    };

    const {formStateValid, validateField} = useValidation<InputsValidLogin>({
        schema: loginSchema,
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

    const onSubmitModal = async () => {
        if (
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(resetEmail)
        ) {
            onClickChangeOpenModal();
            await authService.requestChangePasswordLink(resetEmail)
                .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setEndpointsError(error.response.data.errors.map((err: { detail: string; }) => err.detail));
                    setShowToaster(true);
                }
            });
        } else {
            console.log("error");
        }
    };

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        resetEmail = e.target.value
    }
    const debouncedValidation = debounce((type: InputLoginKeys, value: string) => {
        setFormStateValue((prevState) => ({
            ...prevState,
            [type]: value,
        }));

        validateField(type, value);

        (reach(loginSchema, type) as ISchema<unknown>)
            .validate(value, {abortEarly: false})
            .catch((error: { errors: string[]; }) => {
                setError(type, {type: "manual", message: error.errors[0]});
            });
    }, 1000);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: InputLoginKeys
    ) => {
        const value = e.target.value;
        debouncedValidation(type, value);
    };


    const deliveryFormAuth: SubmitHandler<InputsLogin> = async (data) => {
        await authService
            .login(data)
            .then((response) => {
                setUsername(response.data.user.username);
                if (response.data.user.is_email_confirmed) {
                    setIsAuthenticated(true);
                }
                const token = response.data.token;
                const maxAge = 30 * 24 * 60 * 60;
                document.cookie = `4roomToken=${token};path=/;max-age=${maxAge}`;
                localStorageService.set("user", response.data.user);
                navigate("/");
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setEndpointsError(error.response.data.errors.map((err: { detail: string; }) => err.detail));
                    setShowToaster(true);
                }
            });
        await authService.getProfile().then((response) => {
            setUserIcon(response.data.avatar);
        })
    };

    return (
        <AuthWrapper title={t('sign-in-page.title')} link={backLinkLocation.current}>
            <form
                className={styles.form__auth}
                onSubmit={handleSubmit(deliveryFormAuth)}
            >
                <GoogleAuthButton translation={t('sign-in-page.googleSignIn')}/>
                <h2 className={styles.text__form}>
                    {t('sign-in-page.orSignInWithCredentials')}
                </h2>
                {inputArray.map((value) => {
                    return (
                        <label
                            htmlFor={value}
                            className={styles.label__auth}
                            key={value}>
                            <FormInput<InputLoginKeys, InputsLogin>
                                value={value}
                                register={register}
                                errors={errors}
                                formStateValid={formStateValid}
                                formStateFocus={formStateFocus}
                                formStateValue={formStateValue}
                                onChange={onChange}
                                open={open}
                                onMouseLeave={onMouseLeaveInput}
                                onFocusInput={onFocusInput}/>
                            {formStateValid[value] && !formStateFocus[value] && <IconOkey className={styles.okey__auth}/>}
                            {!formStateValid[value] && formStateFocus[value] && !errors[value] &&
                                <>
                                    <div className={styles.focus__block}>
                                        <p>{t(`shared.${value}`)}</p>
                                    </div>
                                    <p className={styles.text__info}>
                                        {value === 'password' ? <button
                                            type="button"
                                            className={styles.forgot__password__info}
                                            onClick={onClickChangeOpenModal}>
                                            {t('sign-in-page.forgotPassword')}
                                        </button> : t(`sign-in-page.${value}`)}
                                    </p>
                                </>
                            }
                            {errors[value] &&
                                !formStateValid[value] && (
                                    <p className={styles.text__error}>
                                        {t(`sign-in-page.${errors[value]?.message}`)}
                                        {value === "password" &&
                                            <button
                                                type="button"
                                                className={styles.forgot__password__error}
                                                onClick={onClickChangeOpenModal}>
                                                {t('sign-in-page.forgotPassword')}
                                            </button>
                                        }
                                    </p>
                                )}
                            {errors[value] &&
                                !formStateValid[value] && (
                                    <Error className={styles.error__auth}/>
                                )}
                            {value === "password" && formStateFocus[value] && formStateValue.password?.length > 0 && formStateValid[value] &&
                                <button className={styles.button__show} type="button"
                                        onClick={onClickChangeOpen}>
                                    {open ? <OpenPassword/> : <HiddenPassword/>}
                                </button>
                            }
                        </label>
                    );
                })}
                {openModal && (
                    <Modal className="reset"  onOpen={onClickChangeOpenModal}>
                        <form>
                            <p className={styles.text__modal}>
                                Enter your email to reset password
                            </p>
                            <label
                                htmlFor={resetEmail}
                                className={`${styles.label__auth} ${styles.label__modal}`}
                                key={resetEmail}>
                                <FormInput<ResetEmailKeys, ResetEmail>
                                    value="resetEmail"
                                    onChangeInputValue={onChangeInputValue}
                                />
                            </label>

                            <Button
                                type="button"
                                className="accent"
                                onClick={onSubmitModal}>
                                Send
                            </Button>
                        </form>
                    </Modal>
                )}
                <div className={styles.wrapper__buttons}>
                    <Button
                        disabled={!allFieldsValid()}
                        className="accent"
                        type="submit"
                        onClick={() => setFormSubmitted(true)}>
                        {t('sign-in-page.signInButton')}
                    </Button>
                </div>
                <Toaster
                    messages={endpointsError}
                    isVisible={showToaster}
                    onHide={() => setShowToaster(false)}
                />
            </form>
        </AuthWrapper>
    );
}
