import axios from "axios";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";

axios.defaults.baseURL = "https://back.4rooms.pro";

export const getChatsRoom = async (room: string | undefined) => {
    try {
        const { data } = await secureApi.get(`/chat/get/${room}/popular/`);
        return data;
    } catch (error) {
        return error;
    }
};

export const createChat = async (
    room: string | undefined,
    formData:
        | {
              image: string;
              title: string;
              description: string;
          }
        | FormData
) => {
    try {
        const { data } = await secureApi.post(`/chat/post/${room}/`, formData);
        return data;
    } catch (error) {
        return error;
    }
};

export const getAllMessages = async (
    chatId: number | undefined,
) => {
    try {
        const { data } = await secureApi.get(`/chat/messages/get/${chatId}/`);
        return data;
    } catch (error) {
        return error;
    }
};

export const chatService = {
    getChatsRoom,
    createChat,
    getAllMessages,
};
