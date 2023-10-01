import axios from "axios";
import { EmailConfirmationResponse, InputsLogin, InputsRegistraytion } from "../../App.types";

axios.defaults.baseURL = 'https://back.4rooms.pro';

const signup = async (dataForm: InputsRegistraytion) => {
    try {
        const {data} = await axios.post("/api/register/", dataForm)
        return data;
    } catch (err) {
        return err;
    }
};

const login = async (dataForm: InputsLogin) => {
    try {
        const {data} = await axios.post("/api/login/", dataForm)
        return data;
    } catch (err) {
        return err;
    }
};

const resetPassword = async (url: string, data: any) => {
    const response = await axios({
        url,
        method: "POST",
        data,
    });
    return response;
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

const authService = {
    signup,
    login,
    resetPassword,
    logout,
    confirmEmail,
};

export default authService;
