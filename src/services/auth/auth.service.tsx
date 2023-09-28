import axios from "axios";
import { InputsLogin } from "../../App.types";

axios.defaults.baseURL = 'https://back.4rooms.pro';

const signup = async (dataForm: InputsLogin) => {
    try {
        const {data} = await axios.post("/api/login/", dataForm)
        return data;
    } catch (err) {
        return err;
    }
};

const confirmEmail = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (err: any) {
        console.error(err.response.data);
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

const authService = {
    signup,
    confirmEmail,
    login,
    resetPassword,
    logout,
};

export default authService;
