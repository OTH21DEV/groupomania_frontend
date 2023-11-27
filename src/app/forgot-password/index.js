import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import FormForgotPassword from "../../components/form-forgot-password";

const ForgotPassword = () => {
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

  return <FormForgotPassword showSuccessMessage={showSuccessMessage} user={user} setUser={setUser} onSubmit={handleSubmit} errorMessage={errorMessage} />;
};

export default ForgotPassword;
