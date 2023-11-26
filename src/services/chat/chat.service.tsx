import axios from "axios";

axios.defaults.baseURL = "https://back.4rooms.pro";

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const cookieString: string | null = document.cookie;
function extractToken(cookieString: string): string | null {
    const pattern = /4roomToken=([^;]+)/;
    const match = cookieString.match(pattern);
    return match ? match[1] : null;
}
const token = extractToken(cookieString);

export const getChatsRoom = async (room: string | undefined) => {
    try {
        if (token !== null) {
            setAuthHeader(token);
            const { data } = await axios.get(`/api/chat/get/${room}/popular/`);
            return data;
        } else {
            throw new Error("Token is null");
        }
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
        if (token !== null) {
            setAuthHeader(token);
            const { data } = await axios.post(`/api/chat/post/${room}/`, formData);
            return data;
        } else {
            throw new Error("Token is null");
        }
    } catch (error) {
        return error;
    }
};

export const chatService = {
    getChatsRoom,
};
