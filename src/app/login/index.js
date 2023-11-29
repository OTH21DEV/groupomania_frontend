import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authData } from "../../services/auth-services";
import { useSpring } from "react-spring";
import Form from "../../components/form";

const Login = () => {
  const [user, setUser] = useState({});

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

  //Keep the users info when switch from signin (demo purpose)
  useEffect(() => {
    setUser({
      email: "steveTony@rogers.com",
      password: "azerty",
      pseudo: "",
    });
  }, [location.pathname]);

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

        if (apiEndpoint === "/login" && buttonClicked === true && result.userId && result.token) {
          console.log("here");
          console.log(result.userId);
          console.log(result.token);
          console.log(buttonClicked);
          navigate("/posts");
          localStorage.setItem("userData", JSON.stringify(result));
        }
      } catch (error) {
        // Handle error case
        console.log(error.message);
      }
    }

    submitForm();
  }

  // Handle the naivigation between login and signup
  //if sign up or log in button clicked
  function handleSignUp() {
    setSignUp(!signUp);
    setButtonClicked(false);
    //clean up the user info from login before access the signup
    setUser({ email: "", password: "", pseudo: "" });

    if (!signUp) {
      navigate("/signup");
      // setUser({ email: "", password: "", pseudo: "" });
    } else {
      console.log(user);

      navigate("/login");
    }
  }

  useEffect(() => {
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
    <Form
      slideBoxProps={slideBoxProps}
      topLayerProps={topLayerProps}
      signUp={signUp}
      onSubmit={handleSubmit}
      user={user}
      setUser={setUser}
      errorMessage={errorMessage}
      buttonClicked={buttonClicked}
      pathname={pathname}
      handleButtonClick={handleButtonClick}
      handleSignUp={handleSignUp}
      showSuccessMessage={showSuccessMessage}
    />
  );
};

export default Login;
