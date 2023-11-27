import React from "react";
import { cn as bem } from "@bem-react/classname";
import Popup from "../popup";
import "./style.css";

const FormForgotPassword = ({ showSuccessMessage, onSubmit, user, setUser, errorMessage }) => {
  const cn = bem("Form-forgot");

  return (
    <div className={cn("wrapper")}>
      {!showSuccessMessage ? (
        <form
          className={cn()}
          method="post"
          onSubmit={(e) => {
            onSubmit(e);
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
        <Popup text={"Password reset email sent successfully to your email"} link={"/"} btnName={"CLOSE"} isClicked={false} />
      )}
    </div>
  );
};
export default FormForgotPassword;
