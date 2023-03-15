import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";

import Styles from "./App.css";
import LoginForm from "./components/LoginForm";
import { Logo } from "./components/Logo/logo";
import Logout from "./components/Logout";
import Main from "./components/Main";
import { Profile } from "./components/Profile/profile";
import { ProfileForm } from "./components/ProfileForm";
import RegisterForm from "./components/RegistrationForm";
import { refreshSessionTh } from "./store/authReducer/actions";
import { refreshUser } from "./store/profileReducer/actions";
import QuestionPage from "./components/QuestionPage";

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(refreshSessionTh());
  }, []);

  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  return (
    <>
      <nav>
        {isAuth ? (
          <>
            <img src="logo.png" alt="logo" />
            <div className="userinfo">
              Logged in as: {user?.name || user?.email}
            </div>
            <Link to="/logout">Logout</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <img src="logo.png" alt="logo" />
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/form" element={<ProfileForm />} />
        <Route path="/question/:id" element={<QuestionPage />} />
      </Routes>
    </>
  );
}

export default App;
