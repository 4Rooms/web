import { createContext, Dispatch, SetStateAction } from "react";

interface ChatContextType {
    roomName: string | undefined;
    setRoomName: Dispatch<SetStateAction<string | undefined>>;
    roomsList: Array<{
        id: number;
        title: string;
        room: string;
        img: string;
        user: string;
        description: string;
        url: string;
        timestamp: string;
        likes: number;
    }> | undefined;
    setRoomsList: Dispatch<SetStateAction<Array<{
        id: number;
        title: string;
        room: string;
        img: string;
        user: string;
        description: string;
        url: string;
        timestamp: string;
        likes: number;
    }> | undefined>>;
    chatOpen: boolean;
    setChatOpen: Dispatch<SetStateAction<boolean>>;
    chatId: number;
    setChatId: Dispatch<SetStateAction<number>>
}

export const ChatContext = createContext<ChatContextType>(
    {} as ChatContextType
);