import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from './pages/auth/auth-context/auth-provider';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
