import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from './pages/auth/auth-context/auth-provider';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./pages/auth/auth-context/auth-provider.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>

                    <App/>
                </I18nextProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
