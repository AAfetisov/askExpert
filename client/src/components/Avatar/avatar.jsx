import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Rate } from '../Rate/rate';
import Styles from './avatar.module.css';
import { refreshUserAC } from '../../store/profileReducer/actions';

export function AvatarComp() {
  // const user = useSelector((state) => state.profile.user);
  // console.log(user.avatar, '=======>store.profile.user');
  const [avatar, getAvatar] = useState('');
  console.log(avatar, '=======>avatar');
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAvatar = async () => {
      const response = await fetch('http://localhost:4000/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result, '!!!! result');
        getAvatar(result.userpic);
      }
    };
    getUserAvatar();
  }, []);

  return (
    <Avatar
      alt="Remy Sharp"
      src={avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
      sx={{ width: 200, height: 200 }}
    />

  // <div className={Styles.imgBox}>
  //   <img
  //     className={Styles.avatar}
  //     src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
  //     alt="foto"
  //   />
  //   <h3>Your rate</h3>
  //   <Rate />
  // </div>
  );
}
