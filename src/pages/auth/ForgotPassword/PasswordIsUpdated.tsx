import React from "react";
import { Link } from "react-router-dom";

export default function PasswIsUpdated() {
  return (
    <div>
      <h3>Password is Updated</h3>
      <p>
        Please <Link to="/login">sign in</Link>
      </p>
    </div>
  );
}
