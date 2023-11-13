import axios from "axios";

axios.defaults.baseURL = "https://back.4rooms.pro";

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getChatsRoom = async (room: string | undefined) => {
    try {
        setAuthHeader(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNDIxMDUxLCJpYXQiOjE2OTk4MjkwNTEsImp0aSI6ImZjYzBjNDViYzM0MTQ4NWY4OWIyMDYxZDYyY2RkMTVkIiwidXNlcl9pZCI6NTF9.YVLEbMJ9zG03_MEBA5Usubz3WRMtSagVl63BLe1X6ww"
        );
        const { data } = await axios.get(`/api/chat/get/${room === "cinema" ? "films" : room}/popular/`);
        return data;
    } catch (error) {
        return error;
    }
};

export const chatService = {
    getChatsRoom,
};
