import axios from "axios";
import { EmailConfirmationResponse, InputsLogin, InputsRegistraytion } from "../../App.types";

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

const logout = () => {
    localStorage.clear();
};

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

const authService = {
    signup,
    login,
    resetPassword,
    logout,
    confirmEmail,
    sendSecondEmail
};

export default authService;
