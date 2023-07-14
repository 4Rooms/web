import { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from "./shared/Header/Header";
import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/auth/Login/Login";
import { AuthContext, AuthProvider } from "./pages/auth/AuthContext/AuthContext";

function App() {
/*
here is a function that will set username in the AuthContextand you can use it in any component
    const {username, setUsername} = useContext(AuthContext)
*/

    const {username} = useContext(AuthContext)

    useEffect(() => {
        const user: unknown = localStorage.getItem("accessToken");
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
