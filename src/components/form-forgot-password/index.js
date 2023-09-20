import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormForgotPassword = () => {
  const cn = bem("Form-forgot");
  const [user, setUser] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  const location = useLocation();
  console.log(location.pathname);

  function handleSubmit(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("email", `${user.email}`);
    const apiEndpoint = location.pathname;

    async function submitForm() {
      try {
        const result = await authData(apiEndpoint, formdata);
        setErrorMessage(result.message);
        console.log(result);
      } catch (error) {
        // Handle error case
        console.log(error.message);
      }
    }
    submitForm();
  }

  return (
    <form className={cn()}
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
        <input type="email" value={user?.email ? user.email : ""} onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
        <button>Send email</button>
      </div>
    </form>
  );
};

export default FormForgotPassword;
