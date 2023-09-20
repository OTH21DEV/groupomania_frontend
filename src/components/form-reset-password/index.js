import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormResetPassword = () => {
  const cn = bem("Form-reset");
  return (
    <form className={cn()}>
      <div className={cn()}>
        <h2>Reset password</h2>

        <div className={cn("input")}>
          <label>Enter your new password </label>
          <input type="email"></input>
        </div>

        <div className={cn("input")}>
          <label>Confirm new password </label>
          <input type="email"></input>
        </div>
        <button>Reset password</button>
      </div>
    </form>
  );
};

export default FormResetPassword;
