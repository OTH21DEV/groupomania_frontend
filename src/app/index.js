import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./login/index";
import ForgotPassword from "./forgot-password";
import ResetPassword from "./reset-password";
import Posts from "./posts/index";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/post" element={<Posts />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
