import React, { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faSquareCaretUp } from "@fortawesome/free-regular-svg-icons";

import people from "../../assets/test.png";
import { authData } from "../../services/auth-services";

const Form = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    pseudo: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState({});



  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    var formdata = new FormData();

    if (location.pathname === "/login") {
      formdata.append("email", `${user.email}`);
      formdata.append("password", `${user.password}`);
    } else {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      formdata.append("email", `${user.email}`);
      formdata.append("password", `${user.password}`);
      formdata.append("pseudo", `${user.pseudo}`);
      //append file if loaded by user
      file && formdata.append("image", file, file.name);
    }

    const apiEndpoint = location.pathname === "/login" ? "/login" : "/signup";

    //API call
    async function test() {
      try {
        const result = await authData(apiEndpoint, formdata);
        setErrorMessage(result.message);
        console.log(result);
      } catch (error) {
        // Handle error case
        console.log(error.message);
      }
    }
    test();
  }

  function handleClick() {
    setShowPassword(!showPassword);
  }

  function handleSignUp() {
    setSignUp(!signUp);

    // Reset the errorMessage state object
    setErrorMessage({});

    // Reset the file state object
    setFileName("");

    if (!signUp) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);
  }


  useEffect(() => {
    if (location.pathname === "/signup") {
      setSignUp(true);
    }
  }, [location]);

  const cn = bem("Form");

  console.log(errorMessage);
  return (
    <div className={cn()}>
      <div className={cn("left-side")}>
        {/**Form deco waves */}
        <svg viewBox="0 0 500 200">
          <path d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0" fill="rgb(57, 27, 112)"></path>
          <path d="M 0 50 C 150 150 330 -30 500 50 L 500 0 L 0 0" fill="#0E7452" opacity="0.8"></path>
          <path d="M 0 50 C 215 150 250 0 500 100 L 500 0 L 0 0" fill="#0E7452" opacity="0.5"></path>
        </svg>

        <div>
          <h2>Welcome to Groupomania!</h2>
          <p>Professional social network </p>
          <img className={cn("left-side-icon")} src={people} alt=""></img>
        </div>
      </div>

      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <div className={cn("title")}>
          <h2>Get Started</h2>
          <p>
            Don't have the account? <span onClick={handleSignUp}>Sign Up</span>
          </p>
        </div>

        {/**Input email */}
        <label>Email</label>
        {errorMessage.email && <p className={cn("error-msg")}>{errorMessage.email}</p>}

        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
        {/**Input password */}
        <label>Password</label>
        {errorMessage.password && <p className={cn("error-msg")}>{errorMessage.password}</p>}
        <div className={cn("input-password")}>
          <input type={showPassword ? "text" : "password"} value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
          <span onClick={(e) => handleClick(e)}>
            {" "}
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} id={cn("eye-icon")}></FontAwesomeIcon>
          </span>
        </div>
        {/**Add error message on login page */}
        {!signUp && errorMessage && <p className={cn("error-msg")}>{errorMessage.error}</p>}
        {/**Add inputs for sign up form */}
        {signUp && (
          <>
            {/**Input pseudo */}
            <label>Pseudo</label>
            {errorMessage.pseudo && <p className={cn("error-msg")}>{errorMessage.pseudo}</p>}
            <input type="text" value={user.pseudo} onChange={(e) => setUser({ ...user, pseudo: e.target.value })}></input>
            {/**Input file */}
            <div className={cn("input-file")}>
              <span>Image</span>
              <input type="file" id="file-input" onChange={handleFileChange} style={{ display: "none" }} />
              <label htmlFor="file-input" id="file-label">
                {fileName ? fileName : <FontAwesomeIcon icon={faSquareCaretUp} />}
              </label>
            </div>
          </>
        )}

        <div className={cn("button")}>
          <button>{signUp ? "Sign Up" : "Login"}</button>
        </div>
        <a href="/forgot-password" className={cn("reset-password")}>Forgot your password?</a>
      </form>
    </div>
  );
};

export default Form;
