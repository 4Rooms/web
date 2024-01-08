import styles from "../auth.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Error, HiddenPassword, IconOkey, OpenPassword } from "../../../assets/icons.tsx";
import {
    InputSignupKeys,
    InputsLogin,
    InputsRegistraytion,
    InputsValidRegistration
} from "../../../App.types.ts";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "./auth-context/auth-context.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import authSchema from "./signup-schema.ts";
import GoogleAuthButton from "../../../shared/google-auth-button/google-auth-button.tsx";
import AuthWrapper from "../../../shared/auth-wrapper/auth-wrapper.tsx";
import useValidation from "../../../shared/use-validate/use-validate.tsx";
import Button from "../../../shared/button/button.tsx";
import FormInput from "../../../shared/auth-input/form-Input.tsx";
import Toaster from "../../../shared/toaster/toaster.tsx";
import { useTranslation } from "react-i18next";
import { ISchema, reach } from "yup";
import debounce from "../../../utils/debounce/debounce.ts";

export default function SignupPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'auth-page' });
    const allFieldsValid = () => {
        return Object.values(formStateValid).every(value => value);
    };
    const {setUsername, setUserIcon} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkLocation = useRef(location.state?.from ?? "/");
    const inputArray: InputSignupKeys[] = ["email", "username", "password"];
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [formStateValue, setFormStateValue] = useState<InputsRegistraytion>({
        username: "",
        email: "",
        password: "",
    });
    const [endpointsError, setEndpointsError] = useState<string[]>([''])
    const [formStateFocus, setFormStateFocus] =
        useState<InputsValidRegistration>({
            username: false,
            email: false,
            password: false,
        });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors},
    } = useForm<InputsRegistraytion>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
        resolver: yupResolver(authSchema),
    });

    const onFocusInput = (type: keyof InputsValidRegistration) => {
        setFormStateFocus((prevFocus) => ({
            ...prevFocus,
            [type]: true,
        }));
    };

    const onMouseLeaveInput = (type: keyof InputsValidRegistration) => {
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

    const {formStateValid, validateField} = useValidation<InputsValidRegistration>({
        schema: authSchema,
        formSubmitted,
        setError,
        clearErrors,
        initialState: {
            username: false,
            email: false,
            password: false,
        }
    });

    const debouncedValidation = debounce((type: InputSignupKeys, value: string) => {
        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
        (reach(authSchema, type) as ISchema<unknown>)
            .validate(value, {abortEarly: false})
            .catch((error: { errors: string[]; }) => {
                setError(type, {type: "manual", message: error.errors[0]});
            });
    }, 1000);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: InputSignupKeys) => {
        const value = e.target.value;
        debouncedValidation(type, value);
    };

    const deliveryFormAuth: SubmitHandler<InputsRegistraytion> = async (
        data
    ) => {
        await authService.signup(data)
            .then((response) => {
                setUsername(response.data.username);
                localStorageService.set("user", response.data);
                navigate("/account-confirmation", {state: {formData: data}});
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
    const [showToaster, setShowToaster] = useState(false);

    return <AuthWrapper title={t('createAccount')} link={backLinkLocation.current}>
        <form
            className={styles.form__auth}
            onSubmit={handleSubmit(deliveryFormAuth)}>
            <div>
                <GoogleAuthButton translation={t('sign up with google')}/>
                <h2 className={styles.text__form}>{t('googleSignUp')}</h2>
            </div>

            {inputArray.map((value) =>
                <label
                    htmlFor={value}
                    className={styles.label__auth}
                    key={value}>
                    <FormInput<InputSignupKeys, InputsRegistraytion>
                        value={value}
                        register={register}
                        errors={errors}
                        formStateValid={formStateValid}
                        formStateFocus={formStateFocus}
                        formStateValue={formStateValue}
                        open={open}
                        onChange={onChange}
                        onFocusInput={onFocusInput}
                        onMouseLeave={onMouseLeaveInput}
                    />

                    {formStateValid[value] && !formStateFocus[value] && <IconOkey className={styles.okey__auth}/>}

                    {value === "password" && formStateFocus[value] && formStateValue.password?.length > 0 && formStateValid[value] &&
                        <button className={styles.button__show} type="button"
                                onClick={onClickChangeOpen}>
                            {open ? <OpenPassword/> : <HiddenPassword/>}
                        </button>
                    }

                    {!formStateValid[value as keyof InputsLogin] && formStateFocus[value as keyof InputsLogin] && !errors[value as keyof InputsLogin] &&
                        <>
                            <div className={styles.focus__block}>
                                <p>{value}</p>
                            </div>
                            <p className={styles.text__info}>
                                {t(value)}
                            </p>
                        </>
                    }

                    {errors[value] && !formStateValid[value] &&
                        <>
                            <p className={styles.text__error}>{t(`${errors[value]?.message}`)}</p>
                            <Error className={styles.error__auth}/>
                        </>
                    }
                </label>
            )}
            <div className={styles.wrapper__buttons}>
                <Button disabled={!allFieldsValid()} className='accent' type='submit' onClick={() => setFormSubmitted(true)}>
                    {t('sign up')}
                </Button>
            </div>

            <Toaster
                messages={endpointsError}
                isVisible={showToaster}
                onHide={() => setShowToaster(false)}
            />
        </form>
    </AuthWrapper>
}
