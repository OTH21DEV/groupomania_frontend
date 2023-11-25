import React from "react";
import Popup from "../popup";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormResetPassword = ({ onSubmit, showSuccessMessage, errorMessage, user, setUser }) => {
  const cn = bem("Form-reset");

  return (
    <>
      {!showSuccessMessage ? (
        <form className={cn()} onSubmit={onSubmit}>
          <h2>Reset password</h2>
          <div className={cn("input")}>
            <label>Enter your new password </label>
            <input type="password" name="password" value={user.password} onChange={(e) => setUser({ password: e.target.value })} />
          </div>
          {errorMessage?.password ? <p className={cn("error-msg")}>{errorMessage.password}</p> : null}
          <button type="submit">Reset </button>
        </form>
      ) : (
        <Popup text={"Password modified"} link={"/login"} btnName={"CLOSE"} />
      )}
    </>
  );
};

export default FormResetPassword;
