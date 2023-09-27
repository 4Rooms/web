import axios from "axios";
import { Inputs } from "../../App.types";

const signup = async (url: string, data: any) => {
    try {
        const response = await axios({
            url,
            method: "POST",
            data,
        });
        return response;
    } catch (err: any) {
        // console.error(err.response);
        const errorResp = err.response.data;
        const errors = [];
        for (const err in errorResp) {
            errors.push(errorResp[err]);
        }
        throw errors;
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

const login = async (data: Inputs) => {
    // const response = await fetch(url, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //         "Content-Type": "application/json;charset=utf-8",
    //     },
    //     body: JSON.stringify(data),
    // });

    // if (!response.ok) {
    //     console.error(`An error occurred with the status: ${response.status}`);
    //     const errorData = await response.json();
    //     throw errorData;
    // }
    // return response.json();

    // if (!response.ok) throw new Error("Response status is not 200");
    // return await response.json();
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
