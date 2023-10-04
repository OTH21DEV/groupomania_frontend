import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import Popup from "../popup";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const FormResetPassword = () => {
  const cn = bem("Form-reset");
  const [user, setUser] = useState({
    password: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const location = useLocation();

  function handleSubmit(e) {
    
    setUser({ password: "" }) 
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("password", user.password);
    // const apiEndpoint = location.pathname;
    const apiEndpoint = `${location.pathname+location.search}`;
console.log(apiEndpoint)
    async function submitForm() {
      try {
        const result = await authData(apiEndpoint, formdata);
        setErrorMessage(result.message);

        if (result.message.password === undefined && user.password!== "") {
          setShowSuccessMessage(true);
        }
      } catch (error) {
        // Handle error case
        console.log(error);
      }
    }
    submitForm();
  }
console.log(errorMessage)

  return (

    <>
    {!showSuccessMessage ? (
      <form className={cn()} onSubmit={handleSubmit}>
        <div className={cn()}>
          <h2>Reset password</h2>
          <div className={cn("input")}>
            <label>Enter your new password </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ password: e.target.value })}
            />
          </div>
          {errorMessage?.password ? (
            <p className={cn("error-msg")}>{errorMessage.password}</p>
          ) : null}
          {/* <div className={cn("input")}>
            <label>Confirm new password </label>
            <input type="password" name="confirmPassword" value={user.confirmPassword} />
          </div> */}
          <button type="submit">Reset password</button>
        </div>
      </form>
    ) : (
      <Popup text={"Password modified"} link={"/login"} />
    )}
  </>
  //  {!showSuccessMessage ?
  //   (
  //   <form
  //   className={cn()}
  //   onSubmit={(e) => {
  //     handleSubmit(e);
  //   }}
  // >
  //   <div className={cn()}>
  //     <h2>Reset password</h2>

  //     <div className={cn("input")}>
  //       <label>Enter your new password </label>
  //       <input type="password" name="password" value={user.password}  onChange={(e) => setUser({ password: e.target.value })}></input>
  //     </div>
  //     {errorMessage?.password? <p className={cn("error-msg")}>{errorMessage.password}</p> : ""}
  //     {/* <div className={cn("input")}>
  //       <label>Confirm new password </label>
  //       <input type="password" name="password" value={user.password} ></input>
  //     </div> */}
  //     <button type="submit">Reset password</button>
  //   </div>
  // </form>
  
  //   ):(
  //     <Popup text={"Password reset email sent successfully to your email"} link={"/login"}/>
  //   )
  
 

  // }
  );
};

export default FormResetPassword;
