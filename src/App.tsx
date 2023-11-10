import React, { useEffect } from "react";
import "./App.scss";
import ForgotPassword from "./pages/auth/login-page/forgot-password/forgot-password.tsx";
import PasswordReset from "./pages/auth/auth-context/sign/ForgotPassword/PasswordReset.tsx";
import { useAuth } from "./pages/auth/auth-context/use-auth.tsx";
import Chats from "./pages/chats/Chats.tsx";
import GuardRoutes from "./utils/guard-routes.tsx";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthPage } from "./pages/auth/auth-page/auth-page.tsx";
import EmailConfirmPage from "./pages/auth/email-confirm-page/email-confirm-page.tsx";
import SignupPage from "./pages/auth/signup-page/signup-page.tsx";
import SignupConfirmation from "./pages/auth/signup-page/signup-confirmation/signup-confirmation.tsx";
import LoginPage from "./pages/auth/login-page/login-page.tsx";
import { DashboardPage } from "./pages/dashboard/Dashboard.tsx";

function App() {
    // here is a function that will set username in the AuthContext and you can use it in any component
    const { isAuthenticated, username, setUsername } = useAuth();
    const location = useLocation()
    const pathsToHideHeader = ['/authentication', '/auth', '/create-account', '/password-reset', '/forgot-password', '/account-confirmation', '/confirm-email'];

    const showHeader = !pathsToHideHeader.includes(location.pathname);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            const loggedInUsername = foundUser.username;
            setUsername(loggedInUsername);
        }
    }, []);

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={ <SharedLayout user={username} isAuthenticated={isAuthenticated} showHeader={showHeader}/> }>
                    <Route element={<GuardRoutes />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="/chat/:room" element={<Chats />} />
                    </Route>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/authentication" element={<LoginPage />} />
                    <Route path="/create-account" element={<SignupPage />}/>
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="/account-confirmation" element={<SignupConfirmation />}/>
                    <Route path="/confirm-email" element={<EmailConfirmPage />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
