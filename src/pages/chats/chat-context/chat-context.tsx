import { createContext, Dispatch, SetStateAction } from "react";

interface ChatContextType {
    roomName: string | undefined;
    setRoomName: Dispatch<SetStateAction<string | undefined>>;
}

export const ChatContext = createContext<ChatContextType>(
    {} as ChatContextType
  );
