import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Rate } from '../Rate/rate';
import Styles from './avatar.module.css';

export function AvatarComp() {
  const user = useSelector((state) => state.profile.user);
  console.log(user.avatar, '=======>store.profile.user');

  return (
    <Avatar
      alt="Remy Sharp"
      src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
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
