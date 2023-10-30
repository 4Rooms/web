export type InputsLogin = {
    username: string;
    password: string;
};

export type InputsRegistraytion = {
    email: string;
    username: string;
    password: string;
};

export type ResetEmail = {
    resetEmail: string;
};

export type InputsCreate = {
    title: string;
    description: string;
};

export type InputsResetPassword = {
    oldPassword: string;
    newPassword: string;
};

export type InputSignupKeys = "email" | "username" | "password";
export type InputLoginKeys = "username" | "password";
export type ResetEmailKeys = "resetEmail";
export type ForgotKeys = "password";
export type InputsCreateKeys = "title" | "description";
export type InputResetPasswordKeys = "oldPassword" | "newPassword";

export type InputsReset = {
    password: string;
};

export type InputsValidRegistration = {
    email: boolean;
    username: boolean;
    password: boolean;
};

export type InputsForgotValid = {
    password: boolean;
};

export type InputsValidLogin = {
    username: boolean;
    password: boolean;
};

export type ConfirmPasswordValid = {
    confirmPassword: boolean;
};

export type InputsValidReset = {
    password: boolean;
};

export type InputsValidResetPassword = {
    oldPassword: boolean;
    newPassword: boolean;
};

export type InputsCreateValid = {
    title: boolean;
    description: boolean;
};

export interface LogoProps {
    className?: string;
}

export interface ErrorProps {
    className: string;
}
export type EmailConfirmationResponse = {
    is_email_confirmed: boolean;
};

export type ChildrenModal = {
    children: React.ReactElement;
    onOpen: () => void;
    className?: string;
};
