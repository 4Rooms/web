import React, { ReactNode, useState } from "react";
import { ChatContext } from "./chat-context";
import { MessageList } from "../../../App.types";

export function ChatProvider({ children }: { children: ReactNode }) {
    const [roomName, setRoomName] = useState<string | undefined>(undefined);
    const [roomsList, setRoomsList] = useState<
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
    >(undefined);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatId, setChatId] = useState<number>(1);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<MessageList>([]);
    const [online, setOnline] = useState<
        { id: number; username: string; avatar: string }[]
    >([]);
    const [category, setCategory] = useState("new");
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [update, setUpdate] = useState({
        edit: false,
        text: "",
        id: 0,
    });
    const [deleteChat, setDeleteChat] = useState({
        name: "",
        delete: false,
    });

    return (
        <ChatContext.Provider
            value={{
                roomName,
                setRoomName,
                roomsList,
                setRoomsList,
                chatOpen,
                setChatOpen,
                chatId,
                setChatId,
                ws,
                setWs,
                message,
                setMessage,
                online,
                setOnline,
                category,
                setCategory,
                imageURLs,
                setImageURLs,
                update,
                setUpdate,
                deleteChat,
                setDeleteChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
