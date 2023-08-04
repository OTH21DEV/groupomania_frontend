import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormResetPassword = () => {
  const cn = bem("Form-forgot");
  return (
    <>
      <div className={cn("content")}>
        <h2>Reset password</h2>
        <p>Enter your new password below </p>
      </div>
      <div className={cn("input")}>
        <input type="email"></input>
      </div>

      <div className={cn("content")}>
        <p>Confirm new password below</p>
      </div>
      <div className={cn("input")}>
        <input type="email"></input>
        <button>Reset password</button>
      </div>
    </>
  )
};

export default FormResetPassword;
