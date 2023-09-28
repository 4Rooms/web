export type InputsLogin = {
    username: string;
    password: string;
};

export type InputsRegistraytion = {
    email: string;
    username: string;
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

export interface ErrorProps {
    className: string;
}
