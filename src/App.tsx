import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./shared/Header/Header";
import { AuthPage } from "./pages/auth/auth-page/auth-page.tsx";
import { DashboardPage } from "./pages/dashboard/dashboard.tsx";
import GuardRoutes from "./utils/guard-routes.tsx";
import { useAuth } from "./pages/auth/auth-context/use-auth.tsx";
import Chats from "./pages/Chats/Chats";
import Login from "./pages/auth/Login/Login.tsx";
import Signup from "./pages/auth/Signup/Signup.tsx";
import PasswordReset from "./pages/auth/ForgotPassword/PasswordReset.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword.tsx";
import CheckYourEmail from "./pages/auth/Signup/CheckYourEmail.tsx";

function App() {
  // here is a function that will set username in the auth-context and you can use it in any component
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
    <Router>
      {isAuthenticated && <Header user={username} />}
      <Routes>
        <Route element={<GuardRoutes/>}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/chat" element={<Chats />} />
        </Route>
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/authentication" element={<Login/>} />
        <Route path="/create-account" element={<Signup/>} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-your-email" element={<CheckYourEmail />} />


      </Routes>
    </Router>
  );
}

export default App;
