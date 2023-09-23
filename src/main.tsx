import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from './pages/auth/auth-context/auth-provider';
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        </AuthProvider>
    </React.StrictMode>
);
