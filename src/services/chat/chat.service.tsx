import axios from "axios";
import secureApi from "../../utils/axios-inteseptor/axios-interseptes.ts";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getChatsRoom = async (
    room: string | undefined,
    category: string | undefined
) => {
    try {
        const categoryMap = {
            нові: "new",
            популярні: "popular",
            старі: "old",
        };

        const { data } = await secureApi.get(
            `/chat/get/${room}/${
                categoryMap[category as keyof typeof categoryMap] || category
            }/`
        );
        return data;
    } catch (error) {
        return error;
    }
};

export const createChat = async (
    room: string | undefined,
    formData:
        | {
              img: Blob;
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

export const getAllMessages = async (chatId: number | undefined) => {
    try {
        const { data } = await secureApi.get(`/chat/messages/get/${chatId}/`);
        return data;
    } catch (error) {
        return error;
    }
};

export const getSavedChats = async (roomName: string | undefined) => {
    try {
        const { data } = await secureApi.get(
            `/chat/saved_chats/get/${roomName}/`
        );
        return data;
    } catch (error) {
        return error;
    }
};

export const deleteChat = async (chatId: number | undefined) => {
    try {
        const { data } = await secureApi.delete(`/chat/update/${chatId}/`);
        return data;
    } catch (error) {
        return error;
    }
};

export const postSavedChat = async (chat_id: number) => {
    try {
        const { data } = await secureApi.post("/chat/saved_chats/post/", {
            chat_id,
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const deleteSavedChat = async (chat_id: number) => {
    try {
        const { data } = await secureApi.delete(
            `/chat/saved_chats/delete/${chat_id}/`
        );
        return data;
    } catch (error) {
        return error;
    }
};

export const getCreateChat = async (roomName: string | undefined) => {
    try {
        const { data } = await secureApi.get(`/chat/my_chats/get/${roomName}/`);
        return data;
    } catch (error) {
        return error;
    }
};

export const updateCreateChat = async (
    chat_ID: number | undefined,
    formData:
        | {
              img: Blob;
              title: string;
              description: string;
          }
        | FormData
) => {
    try {
        const { data } = await secureApi.patch(
            `/chat/update/${chat_ID}/`,
            formData
        );
        return data;
    } catch (error) {
        return error;
    }
};

export const chatService = {
    getChatsRoom,
    createChat,
    getAllMessages,
    deleteChat,
    deleteSavedChat,
    postSavedChat,
    getSavedChats,
};
