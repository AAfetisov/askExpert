/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable prefer-const */
// import { style } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { refreshUserAC, updatedUser, updateUserAC } from '../../store/profileReducer/actions';
import { Avatar, AvatarComp } from '../Avatar/avatar';
import { Rate } from '../Rate/rate';
import StripePay from '../Payments/StripePay';
// import "bootstrap/dist/js/popper.min.js";

import Styles from './profile.module.css';

export function Profile() {
  const [showItem, setShowItem] = useState(false);
  const user = useSelector((state) => state.profile.user);
  console.log(user, '=======>store.profile.user');

  const userAuth = useSelector((state) => state.auth.user);
  console.log(userAuth, 'userAuth');
  const [cash, setCash] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch('http://localhost:4000/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result, '!!!! result');
        dispatch(refreshUserAC(result));
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const getCash = async () => {
      const response = await fetch('http://localhost:4000/profile/form', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setCash(result.cash);
      }
    };
    getCash();
  }, []);

  return (
    <div className={Styles.mainbox}>
      <div className={Styles.avatarBox}> <AvatarComp /></div>

      <div className={Styles.userInfo}>
        {user.name ? (
          <>
            <h3>Name: {user.name}</h3>
            <h3>Surname: {user.surname}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Bio: {user.bio}</h3>
          </>
        ) : (
          <>
            <h3>Name: {userAuth.name}</h3>
            <h3>Surname: {userAuth.surname}</h3>
            <h3>Email: {userAuth.email}</h3>
            <h3>Bio: {userAuth.bio}</h3>
          </>
        )}

        <Link to="/profile/form">
          <button className={Styles.button}>Change your profile</button>
        </Link>
        <br />
        {cash ? <h3>You mony: {cash} $</h3> : <h3>Your money: 0 $</h3>}
        {showItem ? (
          <StripePay />
        ) : (
          <button className={Styles.button} onClick={() => setShowItem(true)}>Cash</button>
        )}
      </div>
    </div>
  );
}
