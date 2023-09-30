import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../../../services/auth/auth.service";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassw, setConfirmPassw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkIfMatch = () => {
    const matched: boolean = password !== confirmPassw ? false : true;
    return matched;
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwMatched: boolean = checkIfMatch();

    if (!passwMatched) {
      setError("Passwords do not match!");
    } else {
      try {
        const search: string = window.location.search;
        const token_id: string = search.slice(10);
        console.log(token_id);

        const url = "https://back.4rooms.pro/api/user/password/reset";
        const data: any = {
          password,
          token_id,
        };
        const response = await authService.resetPassword(url, data);
        console.log(response?.data.message);
        navigate("/password-updated");
      } catch (err: any) {
        // console.error(err.response.data.errors[0].detail);
        setError(err.response.data.errors[0].detail);
      }
    }
  };

  return (
    <div >
      <form onSubmit={onSubmit}>
        <h3>Reset Password</h3>
        <div >
          <label htmlFor="newPassword">
            New Password
            <input
              type="password"
              required
              autoComplete="off"
              placeholder="********"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              required
              autoComplete="off"
              placeholder="********"
              id="confirmPassword"
              value={confirmPassw}
              onChange={(e) => setConfirmPassw(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {error && (
        <div className="err_wrapper">
          <p className="error_msg">{error}</p>
        </div>
      )}
    </div>
  );
}
