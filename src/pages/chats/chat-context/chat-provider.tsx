import React, { ReactNode, useState } from 'react';
import { ChatContext} from './chat-context';

export function ChatProvider({children}: { children: ReactNode }) {
    const [roomName, setRoomName] = useState<string | undefined>(undefined);

    return (
        <ChatContext.Provider value={{roomName, setRoomName}}>
            {children}
        </ChatContext.Provider>
    );
}