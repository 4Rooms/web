import React from "react";
import Toaster from "../toaster/toaster";
import { useChat } from "../../pages/chats/chat-context/use-chat";

export default function Dekanator() {
    const {showToaster, setShowToaster, toasterMessage} = useChat();
    return (
        <Toaster
            messages={toasterMessage}
            isVisible={showToaster}
            onHide={() => setShowToaster(false)}
        />
    );
}
