import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./pages/auth/AuthContext/AuthContext.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId='need client id key from backend'>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
