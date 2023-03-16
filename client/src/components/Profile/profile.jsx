/* eslint-disable import/named */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable prefer-const */
// import { style } from "@mui/system";
<<<<<<< HEAD
import React from 'react';
import { Avatar } from '../Avatar/avatar';
import { Rate } from '../Rate/rate';
=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updatedUser, updateUserAC } from "../../store/profileReducer/actions";
import { Avatar } from "../Avatar/avatar";
import { Rate } from "../Rate/rate";
>>>>>>> dev
// import "bootstrap/dist/js/popper.min.js";

import Styles from './profile.module.css';

<<<<<<< HEAD
const user = {
  name: 'Bob',
  surname: 'Smith',
  email: 'bob2001@gmail.com',
  password: '1234',
  bio: 'I am Bob',
};

=======
>>>>>>> dev
export function Profile() {
  const user = useSelector((state) => state.profile.user);
  console.log(user, "=======>store.profile.user");

  const userAuth = useSelector((state) => state.auth.user);

  return (
    <div className={Styles.mainbox}>
      <Avatar />

      <div className={Styles.userInfo}>
<<<<<<< HEAD
        <h3>
          Name:
          {' '}
          {user.name}
        </h3>
        <h3>
          Surname:
          {' '}
          {user.surname}
        </h3>
        <h3>
          Email:
          {' '}
          {user.email}
        </h3>
        <button type="button">Change your profile </button>
=======
        {user.name ? (
          <>
            <h3>Name: {user.name}</h3>
            <h3>Surname: {user.surname}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Password: {user.password}</h3>
            <h3>Bio: {user.bio}</h3>
          </>
        ) : (
          <>
            <h3>Name: {userAuth.name}</h3>
            <h3>Surname: {userAuth.surname}</h3>
            <h3>Email: {userAuth.email}</h3>
            <h3>Password: {userAuth.password}</h3>
            <h3>Bio: {userAuth.bio}</h3>
          </>
        )}

        <Link to="/profile/form">
          <button>Change your profile</button>
        </Link>
>>>>>>> dev
      </div>
      <Rate />
    </div>
  );
}
