import { createContext, Dispatch, SetStateAction } from "react";
import { MessageList } from "../../../App.types";

interface ChatContextType {
    roomName: string | undefined;
    setRoomName: Dispatch<SetStateAction<string | undefined>>;
    roomsList:
        | Array<{
              id: number;
              title: string;
              room: string;
              img: string;
              user: string;
              description: string;
              url: string;
              timestamp: string;
              likes: number;
          }>
        | undefined;
    setRoomsList: Dispatch<
        SetStateAction<
            | Array<{
                  id: number;
                  title: string;
                  room: string;
                  img: string;
                  user: string;
                  description: string;
                  url: string;
                  timestamp: string;
                  likes: number;
              }>
            | undefined
        >
    >;
    chatOpen: boolean;
    setChatOpen: Dispatch<SetStateAction<boolean>>;
    chatId: number;
    setChatId: Dispatch<SetStateAction<number>>;
    ws: WebSocket | null;
    setWs: Dispatch<SetStateAction<WebSocket | null>>;
    message: MessageList | [];
    setMessage: Dispatch<SetStateAction<MessageList | []>>;
    online: { id: number; username: string; avatar: string }[];
    setOnline: Dispatch<
        SetStateAction<{ id: number; username: string; avatar: string }[]>
    >;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    imageURLs: string[];
    setImageURLs: Dispatch<SetStateAction<string[]>>;
    update: {
        id: number;
        edit: boolean;
        text: string;
    };
    setUpdate: Dispatch<
        SetStateAction<{
            id: number;
            edit: boolean;
            text: string;
        }>
    >;
    deleteChat: {
        name: string;
        delete: boolean;
    };
    setDeleteChat: Dispatch<
        SetStateAction<{
            name: string;
            delete: boolean;
        }>
    >;
    savedChats: {
        id: number;
        user: number;
        chat: number;
        title: string;
        room: string;
        description: string;
        chat_creator: string;
        img: string;
        url: string;
        likes: number;
    }[];
    setSavedChats: Dispatch<
        SetStateAction<
            {
                id: number;
                user: number;
                chat: number;
                title: string;
                room: string;
                description: string;
                chat_creator: string;
                img: string;
                url: string;
                likes: number;
            }[]
        >
    >;
}

export const ChatContext = createContext<ChatContextType>(
    {} as ChatContextType
);
