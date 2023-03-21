/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import Styles from './App.module.css';
import { CurrentProfile } from './components/CurrentProfile/currentProfile';
import LoginForm from './components/LoginForm';
import { Logo } from './components/Logo/logo';
import Logout from './components/Logout';
import Main from './components/Main';
import BasicModal from './components/Modal/Modal';
import { Profile } from './components/Profile/profile';
import { ProfileForm } from './components/ProfileForm';
import QuestionPage from './components/QuestionPage';
import RegisterForm from './components/RegistrationForm';
import { refreshSessionTh } from './store/authReducer/actions';
import { refreshUser } from './store/profileReducer/actions';

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
            <div>
              <img src="logo.png" alt="logo" />
            </div>
            <div className={Styles.loginBox}>
              <div className={Styles.text}>
                Logged in as: {user?.name || user?.email}
              </div>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Logout</Link>
            </div>

          </>
        ) : (
          <>
            <div>
              <img src="logo.png" alt="logo" />
            </div>
            <div className={Styles.loginBox}>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/register">Register</Link>
              </div>
            </div>

          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<CurrentProfile />} />
        <Route path="/profile/form" element={<ProfileForm />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="/rating/:id" element={<BasicModal />} />
      </Routes>
    </>
  );
}

export default App;
