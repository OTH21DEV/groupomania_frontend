import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import FormResetPassword from "../../components/form-reset-password";
import FormLayout from "../../components/form-layout";

const ResetPassword = () => {
  const [user, setUser] = useState({
    password: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const location = useLocation();

  function handleSubmit(e) {
    setUser({ password: "" });
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("password", user.password);

    const apiEndpoint = `${location.pathname + location.search}`;

    async function submitForm() {
      try {
        const result = await authData(apiEndpoint, formdata);
        setErrorMessage(result.message);

        if (result.message.password === undefined && user.password !== "") {
          setShowSuccessMessage(true);
        }
      } catch (error) {
        // Handle error case
        console.log(error);
      }
    }
    submitForm();
  }

  return (
    <FormLayout>
      <FormResetPassword onSubmit={handleSubmit} showSuccessMessage={showSuccessMessage} errorMessage={errorMessage} user={user} setUser={setUser} />
    </FormLayout>
  );
};

export default ResetPassword;
