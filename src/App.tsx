import './App.css'
import UserProfile from "./pages/UserProfile.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./shared/Header/Header.tsx";

function App() {

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/user-profile/:id" element={<UserProfile/>}/>
            </Routes>
        </Router>
    )
}

export default App
