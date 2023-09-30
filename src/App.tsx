import React, { useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/auth-context/sign/Login/Login.tsx";
import Signup from "./pages/auth/auth-context/sign/Signup/Signup.tsx";
import CheckYourEmail from "./pages/auth/auth-context/sign/Login/Login.tsx";
import ForgotPassword from "./pages/auth/auth-context/sign/ForgotPassword/ForgotPassword.tsx";
import PasswordReset from "./pages/auth/auth-context/sign/ForgotPassword/PasswordReset.tsx";
import { useAuth } from "./pages/auth/auth-context/use-auth.tsx";
import Chats from "./pages/Chats/Chats";
import GuardRoutes from "./utils/guard-routes.tsx";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard/dashboard.tsx";
import { AuthPage } from "./pages/auth/auth-page/auth-page.tsx";import ChangeLanguage from "./shared/change-language.tsx";
function App() {
    // here is a function that will set username in the AuthContext and you can use it in any component
    const { isAuthenticated, username, setUsername } = useAuth();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            console.log(foundUser);
            const loggedInUsername = foundUser.username;
            console.log(username);
            setUsername(loggedInUsername);
        }
    }, []);

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<SharedLayout user={username} isAuthenticated={isAuthenticated} />}>
                    <Route element={<GuardRoutes />}>
                        <Route
                            index
                            element={<DashboardPage />}
                        />
                        <Route path="/chat" element={<Chats />} />
                    </Route>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/authentication" element={<Login />} />
                    <Route path="/create-account" element={<Signup />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/check-your-email"
                        element={<CheckYourEmail />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
