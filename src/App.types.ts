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

export type InputsChangeData = {
    email: string;
    username: string;
};

export type InputsChangeUserData = {
    profileEmail?: string;
    profileUsername?: string;
};

export type InputSignupKeys = "email" | "username" | "password";
export type InputLoginKeys = "username" | "password";
export type ResetEmailKeys = "resetEmail";
export type ForgotKeys = "password";
export type InputsCreateKeys = "title" | "description";
export type InputResetPasswordKeys = "oldPassword" | "newPassword";
export type InputChangeDataKeys = "username" | "email";
export type InputChangeUserDataKeys = "profileUsername" | "profileEmail";

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

export type InputsValidChangeData = {
    email: boolean;
    username: boolean;
};

export type InputsValidUserChangeData = {
    profileEmail: boolean;
    profileUsername: boolean;
};

export interface LogoProps {
    className?: string;
}

export interface ErrorProps {
    className: string;
}
export type EmailConfirmationResponse = {
    is_email_confirmed: boolean;
    token: string;
};

export type ChildrenModal = {
    children: React.ReactElement;
    onOpen: () =>
        | void
        | ((prevModalState: {
              open: boolean;
              title: string;
              description: string;
              image: string;
          }) => {
              open: boolean;
              title: string;
              description: string;
              image: string;
          });
    className?: string;
};

export interface Message {
    id: number;
    user_name: string;
    user_avatar: string;
    reactions?: {
        id: number;
        user_name: string;
        reaction: string;
        timestamp: string;
        message: number;
        user: number;
    }[];
    text: string;
    timestamp: string;
    is_deleted: boolean;
    chat: number;
    user: number;
    attachments: [string];
}

export type MessageList = Message[];

export type Result = {
    id: number;
    title: string;
    room: string;
    img: string;
    user: string;
    description: string;
    url: string;
    likes: number;
    timestamp: string;
    chat_creator?: string;
    chat?: number;
}[];
