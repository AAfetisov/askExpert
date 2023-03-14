import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import Main from './components/Main';
import { Profile } from './components/Profile/profile';
import RegisterForm from './components/RegistrationForm';
import { refreshSessionTh } from './store/authReducer/actions';

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(refreshSessionTh());
  }, []);

  return (
    <>

      <nav>
        {isAuth
          ? (
            <>
              <div className="userinfo">
                Logged in as:
                {' '}
                {user?.name}
              </div>
              <Link to="/logout">Logout</Link>
              <Link to="/profile">Profile</Link>
            </>
          )
          : (
            <>
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
      </Routes>
    </>
  );
}

export default App;
