import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../../../../services/auth/auth.service";

export default function ConfirmEmail() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function registerUser() {
      //   console.log(window.location);
      try {
        const origin = window.location.origin;
        const currentUrl = window.location.href;
        const url = currentUrl.replace(
          origin,
          "https://back.4rooms.pro/api"
        );

        const response = await authService.confirmEmail(url);
        if (response?.data.is_email_confirmed) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    registerUser();
  }, []);

  let content;
  if (!isVerified) {
    content = <h3>Verifying...</h3>;
  } else {
    content = (
      <div>
        Email verified. Please <Link to="/login">sign in</Link>
      </div>
    );
  }

  return content;
}
