import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Header from "./shared/Header/Header.tsx";
import UserProfile from "./pages/UserProfile/UserProfile.tsx";
import Login from "./pages/auth/Login.tsx";
import { AuthContext, AuthProvider } from "./pages/auth/AuthContext/AuthContext.tsx";

function App() {
/*
here is a function that will set username in the AuthContextand you can use it in any component
    const {username, setUsername} = useContext(AuthContext)
*/

    const {username} = useContext(AuthContext)

    useEffect(() => {
        const user: any = localStorage.getItem("accessToken");
        console.log(user);

        if (user) {
/*
            setUsername(user.username);
*/
        }
    }, []);

    return (
        <Router>
            <AuthProvider>
                <Header user={username}/>
                <Routes>
                    <Route path="/user-profile/:id" element={<UserProfile/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
