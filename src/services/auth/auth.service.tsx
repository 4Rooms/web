import axios from "axios";
import {
    EmailConfirmationResponse,
    InputsChangeData,
    InputsLogin,
    InputsRegistraytion,
    InputsResetPassword
} from "../../App.types";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";

axios.defaults.baseURL = 'https://back.4rooms.pro/api/';

const signup = async (dataForm: InputsRegistraytion) => {
    return await axios.post("register/", dataForm);
};

const login = async (dataForm: InputsLogin) => {
    try {
        const {data} = await axios.post("login/", dataForm)
        return data;
    } catch (err) {
        return err;
    }
};

const resetPassword = async (url: string, data: unknown) => {
    return axios({
        url,
        method: "POST",
        data,
    });
};

async function logout() {
    try {
        const response = await axios.put("logout/");
        if (response.status === 204) {
            localStorage.clear();
            return { success: true };
        }
        return { success: false, message: 'Failed to logout' };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.detail || 'An error occurred during logout.' };
    }
}

async function confirmEmail(token: string): Promise<EmailConfirmationResponse> {
        const response = await axios.get<EmailConfirmationResponse>('https://back.4rooms.pro/api/confirm-email/', {
            params: {
                token_id: token
            }
        });
        return response.data;
}
const sendSecondEmail = async (email: string) => {
    return await axios.post("send-confirmation-email/", {email});
};

const changePassword = async (dataForm: InputsResetPassword) => {
    return secureApi.put('user/change-password/', dataForm)
}
const updateUserData = async (data: InputsChangeData) => {
    return secureApi.put('user/', data);
};

const updateUserAvatar = async (file:  File | null) => {
    if (!file) {
        throw new Error("No file provided");
    }
    const formData = new FormData();
    formData.append('avatar', file);
    return secureApi.put('profile/', formData);
};

const authService = {
    signup,
    login,
    resetPassword,
    logout,
    confirmEmail,
    sendSecondEmail,
    changePassword,
    updateUserData,
    updateUserAvatar
};

export default authService;
