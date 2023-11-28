import React from "react";
import { cn as bem } from "@bem-react/classname";
import { animated } from "react-spring";
import image from "../../assets/shop_test.jpg";
import Popup from "../popup";
import "./style.css";

const Form = ({ slideBoxProps, topLayerProps, signUp, onSubmit, user, setUser, errorMessage, buttonClicked, pathname, handleButtonClick, handleSignUp, showSuccessMessage }) => {
  const cn = bem("Form");

  return (
    <div className={cn("wrapper")}>
      <div id="back">
        <div className="backRight"></div>
        <div className="backLeft">
          <img src={image} alt=""></img>
        </div>
      </div>

      <animated.div id="slideBox" style={slideBoxProps}>
        <animated.div className="topLayer" style={topLayerProps}>
          <div className={signUp ? "left" : "right"}>
            <div className="content">
              <h2>{!signUp ? "Login" : "Signup"}</h2>
              <form
                id="form-login"
                method="post"
                onSubmit={(e) => {
                  onSubmit(e);
                }}
              >
                <div className="form-element form-stack">
                  <label htmlFor="username-login" className="form-label">
                    Email
                  </label>
                  <input id={!signUp ? "username-login" : "username-signup"} type="text" name="username" value={!signUp ? (user?.email || "steveTony@rogers.com"):user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

                  {errorMessage.email && buttonClicked ? <p className={!signUp ? cn("error-msg") : cn("error-msg-signup")}>{errorMessage.email}</p> : ""}
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-login" className="form-label">
                    Password
                  </label>
                  <input id="password-login" type="password" name="password" value={!signUp ?(user?.password || "azerty"):user?.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
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
