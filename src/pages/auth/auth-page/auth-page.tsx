import React from "react";
import { Link } from "react-router-dom";

export function AuthPage() {
    return (
        <div>
            <h1>Hi</h1>
            <h2>welcome to the 4Rooms</h2>
            <p>Have an account? Sign in or Sign up</p>
            <div>
                <Link to="/authentication">Sign in</Link>
                <Link to="/create-account">Sign up</Link>
            </div>
        </div>
    );
}
