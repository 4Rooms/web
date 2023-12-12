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
}

export const ChatContext = createContext<ChatContextType>(
    {} as ChatContextType
);
