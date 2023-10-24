import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./pages/auth/auth-context/auth-provider";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ChatProvider } from "./pages/chats/chat-context/chat-provider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <ChatProvider>
                <BrowserRouter>
                    <I18nextProvider i18n={i18n}>
                        <App />
                    </I18nextProvider>
                </BrowserRouter>
            </ChatProvider>
        </AuthProvider>
    </React.StrictMode>
);
