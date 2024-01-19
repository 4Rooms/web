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
              user_id: number;
          }>
        | undefined
    >(undefined);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatId, setChatId] = useState<number | null>(null);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState<MessageList>([]);
    const [online, setOnline] = useState<
        { id: number; username: string; avatar: string }[]
    >([]);
    const [category, setCategory] = useState("new");
    const [imageURLs, setImageURLs] = useState<{ name: string; url: string }[]>(
        []
    );
    const [images, setImages] = useState<File[]>([]);
    const [update, setUpdate] = useState({
        edit: false,
        text: "",
        id: 0,
    });
    const [deleteChat, setDeleteChat] = useState({
        name: "",
        delete: false,
    });
    const [savedChats, setSavedChats] = useState<Result>([]);
    const [filterSaved, setFilterSaved] = useState<Result>([]);
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
                images,
                setImages,
                setToasterMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}
