import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";

import Header from "./shared/Header/Header.tsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
