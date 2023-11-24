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
            // Handle the case where token is null
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
        setAuthHeader(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNDIxMDUxLCJpYXQiOjE2OTk4MjkwNTEsImp0aSI6ImZjYzBjNDViYzM0MTQ4NWY4OWIyMDYxZDYyY2RkMTVkIiwidXNlcl9pZCI6NTF9.YVLEbMJ9zG03_MEBA5Usubz3WRMtSagVl63BLe1X6ww"
        );
        const { data } = await axios.post(`/api/chat/post/${room}/`, formData);
        return data;
    } catch (error) {
        return error;
    }
};

export const chatService = {
    getChatsRoom,
};
