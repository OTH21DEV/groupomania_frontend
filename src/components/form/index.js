import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

import { authData } from "../../services/auth-services";
import { useSpring, animated, config } from "react-spring";
import image from "../../assets/shop_test.jpg";
import Popup from "../popup";

const Form = () => {
  const cn = bem("Form");

  const [user, setUser] = useState({
    email: "",
    password: "",
    pseudo: "",
  });
  // const pathname = window.location.pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [pathname, setPathname] = useState("");

  const [signUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [topLayerProps, setTopLayerProps] = useSpring(() => {
    const storedTopLayerProps = JSON.parse(localStorage.getItem("topLayerProps"));
    return storedTopLayerProps || { marginLeft: "0%" };
  });

  const [slideBoxProps, setSlideBoxProps] = useSpring(() => {
    const storedSlideBoxProps = JSON.parse(localStorage.getItem("slideBoxProps"));
    return (
      storedSlideBoxProps || {
        marginLeft: "100%",
        transform: "translateX(-50%)",
        background: "#f9f5ff",
      }
    );
  });

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage({});

    let formdata = new FormData();

    if (location.pathname === "/login") {
      formdata.append("email", `${user.email}`);
      formdata.append("password", `${user.password}`);
    } else {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput?.files[0];

      formdata.append("email", `${user.email}`);
      formdata.append("password", `${user.password}`);
      formdata.append("pseudo", `${user.pseudo}`);
      //append file if loaded by user
      file && formdata.append("image", file, file.name);
    }
    const apiEndpoint = pathname === "/login" ? "/login" : "/signup";

    //API call - post new user

    async function submitForm() {
      try {
        const result = await authData(apiEndpoint, formdata);

        setErrorMessage(result.message);

        if (user.email !== "" && user.password !== "" && user.pseudo !== "" && result.message === "User created") {
          setShowSuccessMessage(true);
          console.log(result);
        }

        if (apiEndpoint === "/login" && result.userId && result.token) {
          navigate("/posts");
          localStorage.setItem("userData", JSON.stringify(result));
        }
      } catch (error) {
        // Handle error case
        console.log(error.message);
      }
    }

    submitForm();

    // setSubmitted(true);
  }

  function handleSignUp() {
    setSignUp(!signUp);

    setButtonClicked(false);
    if (!signUp) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    setUser({ email: "", password: "", pseudo: "" });

    if (location.pathname === "/signup") {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  }, [location.pathname]);

  const handleGoRightClick = () => {
    setSlideBoxProps({
      marginLeft: window.innerWidth > 769 ? "0%" : "50%",
      background: "#f9f5ff",
    });
    setTopLayerProps({ marginLeft: "100%" });
  };

  const handleGoLeftClick = () => {
    if (window.innerWidth > 769) {
      setSlideBoxProps({
        marginLeft: "100%",
        background: "#222831",
      });
    } else {
      setSlideBoxProps({
        marginLeft: "50%",
        background: "#222831",
      });
    }
    setTopLayerProps({ marginLeft: "0%" });
  };

  useEffect(() => {
    const handlePageReload = () => {
      sessionStorage.setItem("pageReloaded", "true");
    };

    window.addEventListener("beforeunload", handlePageReload);

    const goRightElement = document.getElementById("goRight");
    const goLeftElement = document.getElementById("goLeft");

    if (goRightElement) {
      goRightElement.addEventListener("click", handleGoRightClick);
    }

    if (goLeftElement) {
      goLeftElement.addEventListener("click", handleGoLeftClick);
    }

    return () => {
      window.removeEventListener("beforeunload", handlePageReload);

      if (goRightElement) {
        goRightElement.removeEventListener("click", handleGoRightClick);
      }

      if (goLeftElement) {
        goLeftElement.removeEventListener("click", handleGoLeftClick);
      }
    };
  }, [handleGoLeftClick, handleGoRightClick]);

  //Handle the navigation in case of page reload in signup  and browser
  //back arrow
  // useEffect(() => {
  //   const pageReloaded = sessionStorage.getItem("pageReloaded");

  //   const handlePopstate = () => {
  //     navigate("/");
  //   };

  //   window.addEventListener("popstate", handlePopstate);

  //   if (pageReloaded) {
  //     localStorage.removeItem("topLayerProps");
  //     localStorage.removeItem("slideBoxProps");
  //     navigate("/login");
  //   } else {
  //     sessionStorage.setItem("pageReloaded", "false");

  //     if (pathname === "/signup") {
  //       navigate("/");
  //     }
  //   }

  //   return () => window.removeEventListener("popstate", handlePopstate);
  // }, []);

  useEffect(() => {
    const handlePopstate = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handlePopstate);

    sessionStorage.setItem("pageReloaded", "true");

    if (sessionStorage.getItem("pageReloaded")) {
      localStorage.removeItem("topLayerProps");
      localStorage.removeItem("slideBoxProps");
      navigate("/login");
    } else if (pathname === "/signup") {
      navigate("/login");
    }

    return () => {
      window.removeEventListener("popstate", handlePopstate);
      sessionStorage.removeItem("pageReloaded"); // cleanup session storage
    };
  }, []);



  

  // Handle login or signup button click across page transitions
  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <div className={cn("wrapper")}>
      <div id="back">
        <div className="backRight"></div>
        <div className="backLeft">
          <img src={image} alt=""></img>
        </div>
      </div>
      {/* {!showSuccessMessage ? ( */}
      <animated.div id="slideBox" style={slideBoxProps}>
        <animated.div className="topLayer" style={topLayerProps}>
          <div className={signUp ? "left" : "right"}>
            <div className="content">
              <h2>{!signUp ? "Login" : "Signup"}</h2>
              <form
                id="form-login"
                method="post"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="form-element form-stack">
                  <label htmlFor="username-login" className="form-label">
                    Email
                  </label>
                  <input id={!signUp ? "username-login" : "username-signup"} type="text" name="username" value={user?.email || ""} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                  {errorMessage.email && buttonClicked ? <p className={!signUp ? cn("error-msg") : cn("error-msg-signup")}>{errorMessage.email}</p> : ""}
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-login" className="form-label">
                    Password
                  </label>
                  <input id="password-login" type="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                  {errorMessage.password && buttonClicked && <p className={!signUp ? cn("error-msg") : cn("error-msg-signup")}>{errorMessage.password}</p>}
                </div>
                {/**Add error message if empty fields on login page */}
                {!signUp && errorMessage && buttonClicked && <p className={cn("error-msg")}>{errorMessage.error}</p>}

                {/**Add error message if incorrect credentials on login page */}
                {errorMessage === "Incorrect credentials" && <p className={cn("error-msg")}>{JSON.stringify(errorMessage).replace(/"/g, "")}</p>}

                {/**Add forgot password on login page */}
                {!signUp && (
                  <a className={cn("forgot-link")} href="/forgot-password">
                    Forgot a password?
                  </a>
                )}

                {signUp && (
                  <>
                    <div className="form-element form-stack">
                      <label htmlFor="username-signup" className="form-label">
                        Pseudo
                      </label>
                      <input id="username-signup" type="text" name="pseudo" value={user.pseudo} onChange={(e) => setUser({ ...user, pseudo: e.target.value })} />
                      {errorMessage.pseudo && buttonClicked && <p className={cn("error-msg-signup")}>{errorMessage.pseudo}</p>}
                    </div>

                    <div className="form-element form-stack">
                      <label htmlFor="image-signup" className="form-label">
                        Image
                        <input id="image-signup" name="image" type="file" />
                      </label>
                    </div>

                    {/**Add error message on signup page */}

                    {errorMessage === "User already exists" && <p className={cn("error-msg-signup")}>{JSON.stringify(errorMessage).replace(/"/g, "")}</p>}
                  </>
                )}

                <div className="form-element form-submit">
                  {pathname !== "/login" ? (
                    <>
                      <button id="signUp" className="signup" type="submit" name="signup" onClick={handleButtonClick}>
                        Sign up
                      </button>
                      <button id="goLeft" className={` ${pathname !== "/login" && "signup off"}`} onClick={handleSignUp}>
                        Log In
                      </button>
                    </>
                  ) : (
                    <>
                      <button id="logIn" className="login" type="submit" name="login" onClick={handleButtonClick}>
                        Log In
                      </button>
                      <button id="goRight" className={` ${pathname === "/login" && "login off"}`} name="signup" onClick={handleSignUp}>
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </animated.div>
      </animated.div>

      {showSuccessMessage && <Popup text={"User created"} link={"/"} btnName={"CLOSE"} isClicked={false}></Popup>}
    </div>
  );
};

export default Form;
