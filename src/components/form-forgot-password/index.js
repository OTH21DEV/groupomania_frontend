import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormForgotPassword = () => {
  const cn = bem("Form-forgot");
  return (
    <>
      <div className={cn("content")}>
        <h2>Forgot password</h2>
        <p>Enter your email address below and we will send you a reset password </p>
      </div>
      <div className={cn("input")}>
        <input type="email"></input>
        <button>Send email</button>
      </div>
    </>
  );
};

export default FormForgotPassword;
