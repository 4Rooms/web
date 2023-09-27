export type Inputs = {
    email: string;
    name: string;
    password: string;
};

export type InputsValid = {
    email: boolean;
    name: boolean;
    password: boolean;
};

export interface ErrorProps {
    className: string;
}
