import axios from "axios";


axios.defaults.baseURL = 'https://back.4rooms.pro';

export const getChatsRoom = async (room: string | undefined) => {
    try {
        const {data} = await axios.get(`/api/chat/${room}`);
        return data;
    } catch (error) {
        return error;
    }
};

export const chatService = {
    getChatsRoom,
}