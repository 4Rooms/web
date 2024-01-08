import React, { useEffect } from "react";
import "./App.scss";
import ForgotPassword from "./pages/auth/login-page/forgot-password/forgot-password.tsx";
import PasswordReset from "./pages/auth/login-page/forgot-password/forgot-password.tsx";
import { useAuth } from "./pages/auth/signup-page/auth-context/use-auth.tsx";
import Chats from "./pages/Chats/Chats.tsx";
import GuardRoutes from "./utils/guard-routes.tsx";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthPage } from "./pages/auth/auth-page/auth-page.tsx";
import EmailConfirmPage from "./pages/auth/email-confirm-page/email-confirm-page.tsx";
import SignupPage from "./pages/auth/signup-page/signup-page.tsx";
import SignupConfirmation from "./pages/auth/signup-page/signup-confirmation/signup-confirmation.tsx";
import LoginPage from "./pages/auth/login-page/login-page.tsx";
import { DashboardPage } from "./pages/dashboard/Dashboard.tsx";
import Profile from "./pages/profile/Profile.tsx";
import LogOut from "./pages/profile/LogOut/LogOut.tsx";
import ChangeLanguage from "./pages/profile/ChangeLanguage/ChangeLanguage.tsx";
import ChangeTheme from "./pages/profile/ChangeTheme/ChangeTheme.tsx";
import ResetPassword from "./pages/profile/ResetPassword/ResetPassword.tsx";
import ChangeUserData from "./pages/profile/ChangeUserData/ChangeUserData.tsx";
import { setInitialLanguage } from "./utils/language-selector/language-selector.ts";
import Saved from "./pages/saved/Saved.tsx";
import MyChats from "./pages/myChats/MyChats.tsx";
import Dekanator from "./shared/dekanator/Dekanator.tsx";
import { pathsForShowBackGround, pathsToHideHeader } from "./utils/arrays/arrays.tsx";
import { localStorageService } from "./services/local-storage/local-storage.ts";

export default function App() {
    const { isAuthenticated, username, setUsername } = useAuth();
    const location = useLocation();
    const showHeader = !pathsToHideHeader.includes(location.pathname);
    const showBackground = location.pathname.split("/")[2]
    setInitialLanguage();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            const loggedInUsername = foundUser.username;
            setUsername(loggedInUsername);
        }
        const theme = localStorageService.get('theme');
        document.documentElement.setAttribute('data-theme', theme ? theme : 'light');
    }, []);

    return (
        <div
            className={
                pathsForShowBackGround.includes(showBackground)
                    ? `container ${showBackground}`
                    : !isAuthenticated
                    ? "container padding"
                    : "container"
            }
        >
            <Routes>
                <Route
                    path="/"
                    element={
                        <SharedLayout
                            user={username}
                            isAuthenticated={isAuthenticated}
                            showHeader={showHeader}
                        />
                    }
                >
                    <Route element={<GuardRoutes redirectTo="/auth" />}>
                        <Route index element={<DashboardPage />} />
                        <Route
                            path="/chat/:room/:chatId?"
                            element={<Chats />}
                        />
                        <Route path="/saved" element={<Saved />} />
                        <Route path="/my-chats" element={<MyChats />} />
                        <Route path="/profile" element={<Profile />}>
                            <Route path="logout" element={<LogOut />} />
                            <Route
                                path="language"
                                element={<ChangeLanguage />}
                            />
                            <Route path="theme" element={<ChangeTheme />} />
                            <Route
                                path="password"
                                element={<ResetPassword />}
                            />
                            <Route index element={<ChangeUserData />} />
                        </Route>
                    </Route>
                    <Route element={<GuardRoutes redirectTo="/" />}>
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/authentication" element={<LoginPage />} />
                        <Route
                            path="/create-account"
                            element={<SignupPage />}
                        />
                        <Route
                            path="/password-reset"
                            element={<PasswordReset />}
                        />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/account-confirmation"
                            element={<SignupConfirmation />}
                        />
                        <Route
                            path="/confirm-email"
                            element={<EmailConfirmPage />}
                        />
                        <Route
                            path="/notifications"
                            element={<EmailConfirmPage />}
                        />
                    </Route>
                </Route>
            </Routes>
            <Dekanator />
        </div>
    );
}
