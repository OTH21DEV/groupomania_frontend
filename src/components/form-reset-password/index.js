import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormResetPassword = () => {
  const cn = bem("Form-reset");
  const [user, setUser] = useState({
    password: "",
  });
  
  const [errorMessage, setErrorMessage] = useState({});
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("password", `${user.password}`);
    const apiEndpoint = location.pathname;

    async function submitForm() {
      try {
        const result = await authData(apiEndpoint, formdata);
        setErrorMessage(result.message);

        // if (result.message.error === undefined && user.email !== "") {
        //   setShowSuccessMessage(true);
        // }
      } catch (error) {
        // Handle error case
        console.log(error);
      }
    }
    submitForm();
  }


  return (
    <form className={cn()}  onSubmit={(e) => {
      handleSubmit(e);
    }}>
      <div className={cn()}>
        <h2>Reset password</h2>

        <div className={cn("input")}>
          <label>Enter your new password </label>
          <input type="email" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
        </div>

        <div className={cn("input")}>
          <label>Confirm new password </label>
          <input type="email"></input>
        </div>
        <button type="submit">Reset password</button>
      </div>
    </form>
  );
};

export default FormResetPassword;
