export type InputsLogin = {
    username: string;
    password: string;
};

export type InputsRegistraytion = {
    email: string;
    username: string;
    password: string;
};

export type InputSignupKeys = "email" | "username" | "password";
export type InputLoginKeys = "username" | "password";

export type InputsReset = {
    password: string;
};

export type InputsValidRegistration = {
    email: boolean;
    username: boolean;
    password: boolean;
};

export type InputsValidLogin = {
    username: boolean;
    password: boolean;
};

export type InputsValidReset = {
    password: boolean;
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
