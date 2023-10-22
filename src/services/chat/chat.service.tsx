import axios from "axios";


axios.defaults.baseURL = 'https://back.4rooms.pro';

const openRooms = async (room: string) => {
    try {
        const {data} = await axios.get(`/api/chat/${room}`);
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};

export const chatService = {
    openRooms,
}