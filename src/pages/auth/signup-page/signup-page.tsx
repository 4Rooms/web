import styles from "../auth.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Error, HiddenPassword, IconOkey, OpenPassword } from "../../../assets/icons.tsx";
import { InputSignupKeys, InputsRegistraytion, InputsValidRegistration } from "../../../App.types.ts";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../auth-context/auth-context.tsx";
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

export default function SignupPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'auth-page' });
    const allFieldsValid = () => {
        return Object.values(formStateValid).every(value => value);
    };
    const {setUsername} = useContext(AuthContext);
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


    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: InputSignupKeys) => {
        const value = e.target.value;

        setFormStateValue({
            ...formStateValue,
            [type]: value,
        });

        validateField(type, value);
    };


    const deliveryFormAuth: SubmitHandler<InputsRegistraytion> = async (
        data
    ) => {
        await authService.signup(data)
            .then((response) => {
                setUsername(response.data.username);
                localStorageService.set("user", response);
                navigate("/account-confirmation", {state: {formData: data}});
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setEndpointsError(error.response.data.errors.map((err: { detail: string; }) => err.detail));
                    setShowToaster(true);
                }
            });
    };
    const [showToaster, setShowToaster] = useState(false);

    return <AuthWrapper title={'Create an account'} link={backLinkLocation.current}>
        <form
            className={styles.form__auth}
            onSubmit={handleSubmit(deliveryFormAuth)}>
            <GoogleAuthButton translation={t('sign up')}/>
            <h2 className={styles.text__form}>Or sign up with email:</h2>
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
                    />

                    {!errors[value] && formStateValid[value] && <IconOkey className={styles.okey__auth}/>}

                    {value === "password" && formStateValue.password?.length > 0 && !errors[value] &&
                        !formStateValid[value] &&
                        <button className={styles.button__show} type="button"
                                onClick={onClickChangeOpen}>
                            {open ? <OpenPassword/> : <HiddenPassword/>}
                        </button>
                    }

                    {formStateFocus[value] && !formStateValid[value] && !errors[value] &&
                        formStateValue[value].length > 0 &&
                        <div className={styles.focus__block}>
                            <p>{value}
                            </p>
                        </div>
                    }

                    {errors[value] && !formStateValid[value] &&
                        <>
                            <p className={styles.text__error}>{errors[value]?.message}</p>
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
