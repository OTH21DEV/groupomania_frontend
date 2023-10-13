import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import { cn as bem } from "@bem-react/classname";
import Popup from "../popup";
import "./style.css";

const FormForgotPassword = () => {
  const cn = bem("Form-forgot");
  const [user, setUser] = useState({
    email: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [errorMessage, setErrorMessage] = useState({});

  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("email", `${user.email}`);
    const apiEndpoint = location.pathname;

    async function submitForm() {
      try {
        const result = await authData(apiEndpoint, formdata);
        setErrorMessage(result.message);

        if (result.message.error === undefined && user.email !== "") {
          setShowSuccessMessage(true);
        }
      } catch (error) {
      
        console.log(error);
      }
    }
    submitForm();
  }

  return (
    <div className={cn("wrapper")}>
      {!showSuccessMessage ? (
        <form
          className={cn()}
          method="post"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className={cn("content")}>
            <h2>Forgot password</h2>
            <p>Enter your email address below and we will send you a link to create a new password </p>
          </div>
          <div className={cn("input")}>
            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
            {errorMessage?.error ? <p className={cn("error-msg")}>{errorMessage.error}</p> : ""}
            <button type="submit">Send email</button>
          </div>
        </form>
      ) : (
        <Popup text={"Password reset email sent successfully to your email"} link={"/login"} />
      )}
    </div>
  );
};
export default FormForgotPassword;
