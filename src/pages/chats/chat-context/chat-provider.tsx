import React, { ReactNode, useState } from "react";
import { ChatContext } from "./chat-context";
import { MessageList, Result } from "../../../App.types";

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
    const [savedChats, setSavedChats] = useState<
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
            timestamp: string;
        }[]
    >([]);
    const [filterSaved, setFilterSaved] = useState<
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
            timestamp: string;
        }[]
    >([]);
    const [showToaster, setShowToaster] = useState(false);
    const [createChat, setCreateChat] = useState<Result>([]);
    const [filterCreate, setFilterCreate] = useState<Result>([]);
    const [toasterMessage, setToasterMessage] = useState<string[]>([]);

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
                setSavedChats,
                savedChats,
                setCreateChat,
                createChat,
                filterCreate,
                setFilterCreate,
                filterSaved,
                setFilterSaved,
                showToaster,
                setShowToaster,
                toasterMessage, 
                setToasterMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
