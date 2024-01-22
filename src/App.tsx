import React, { lazy, useEffect } from "react";
import "./App.scss";
import { useAuth } from "./pages/auth/signup-page/auth-context/use-auth.tsx";
import GuardRoutes from "./utils/guard-routes.tsx";
import SharedLayout from "./Components/SharedLayout/SharedLayout";
import { Route, Routes, useLocation } from "react-router-dom";
import { setInitialLanguage } from "./utils/language-selector/language-selector.ts";
import Dekanator from "./shared/dekanator/Dekanator.tsx";
import { pathsForShowBackGround, pathsToHideHeader } from "./utils/arrays/arrays.tsx";
import { localStorageService } from "./services/local-storage/local-storage.ts";

const Saved = lazy(() => import('./pages/saved/Saved.tsx'));
const MyChats = lazy(() => import('./pages/myChats/MyChats.tsx'));
const ChangeUserData = lazy(() => import('./pages/profile/ChangeUserData/ChangeUserData.tsx'));
const ResetPassword = lazy(() => import('./pages/profile/ResetPassword/ResetPassword.tsx'));
const ChangeTheme = lazy(() => import('./pages/profile/ChangeTheme/ChangeTheme.tsx'));
const ChangeLanguage = lazy(() => import('./pages/profile/ChangeLanguage/ChangeLanguage.tsx'));
const LogOut = lazy(() => import('./pages/profile/LogOut/LogOut.tsx'));
const Profile = lazy(() => import('./pages/profile/Profile.tsx'));
const DashboardPage = lazy(() => import("./pages/dashboard/Dashboard.tsx"));
const LoginPage = lazy(() => import('./pages/auth/login-page/login-page.tsx'));
const SignupConfirmation = lazy(() => import('./pages/auth/signup-page/signup-confirmation/signup-confirmation.tsx'));
const SignupPage = lazy(() => import('./pages/auth/signup-page/signup-page.tsx'));
const AuthPage = lazy(() => import('./pages/auth/auth-page/auth-page.tsx'));
const Chats = lazy(() => import('./pages/Chats/Chats.tsx'));
const ForgotPassword = lazy(() => import('./pages/auth/login-page/forgot-password/forgot-password.tsx'));
const PasswordReset = lazy(() => import('./pages/auth/login-page/forgot-password/forgot-password.tsx'));
const EmailConfirmPage = lazy(() => import('./pages/auth/email-confirm-page/email-confirm-page.tsx'));


export default function App() {
    const { isAuthenticated, username, setUsername } = useAuth();
    const location = useLocation();
    const showHeader = !pathsToHideHeader.includes(location.pathname);
    const showBackground = location.pathname.split("/")[2]

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            const loggedInUsername = foundUser.username;
            setUsername(loggedInUsername);
        }
        const theme = localStorageService.get('theme');
        document.documentElement.setAttribute('data-theme', theme ? theme : 'light');
        setInitialLanguage();
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
