import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.scss";
import { Signup } from "./components/signup/Signup";
import { Login } from "./components/login/login";
import Notes from "./components/hero/hero";
import { ForgotPassword } from "./components/forgotPassword/ForgotPassword";
import { ResetPassword } from "./components/resetPassword/ResetPassword";
import { Profile } from "./components/profile/Profile";
import { Ncert } from "./components/ncert/Ncert";
import React from "react";
import { Pyqs } from "./components/pyqs/pyqs";
import { Dpp } from "./components/dpp/Dpp";
function App() {
  const url = "https://coachingwebsitebackened.onrender.com";
  // const url = "http://localhost:3000";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup url={url}></Signup>}></Route>
          <Route path="/login" element={<Login url={url}></Login>}></Route>
          <Route path="/" element={<Notes url={url}></Notes>}></Route>
          <Route
            path="/profile"
            element={<Profile url={url}></Profile>}
          ></Route>
          <Route path="/ncert" element={<Ncert url={url}></Ncert>}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPassword url={url}></ForgotPassword>}
          ></Route>
          <Route path="/pyqs" element={<Pyqs url={url}></Pyqs>}></Route>
          <Route path="/dpp" element={<Dpp url={url}></Dpp>}></Route>
          <Route
            path="/resetpassword/:token"
            element={<ResetPassword url={url}></ResetPassword>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
