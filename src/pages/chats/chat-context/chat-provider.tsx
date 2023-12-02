import React, { ReactNode, useState } from "react";
import { ChatContext } from "./chat-context";

export function ChatProvider({ children }: { children: ReactNode }) {
    const [roomName, setRoomName] = useState<string | undefined>(undefined);
    const [roomsList, setRoomsList] = useState<
        Array<{
            id: number;
            title: string;
            room: string;
            img: string;
            user: string;
            description: string;
            url: string;
            timestamp: string;
            likes: number;
        }> | undefined
    >(undefined);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatId, setChatId] = useState<number>(0);
    const [ws, setWs] = useState<WebSocket | null>(null);

    return (
        <ChatContext.Provider
            value={{ roomName, setRoomName, roomsList, setRoomsList, chatOpen, setChatOpen, chatId, setChatId, ws, setWs }}
        >
            {children}
        </ChatContext.Provider>
    );
}
