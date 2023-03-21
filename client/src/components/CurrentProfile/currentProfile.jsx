import { Box, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '../Avatar/avatar';
import { Rate } from '../Rate/rate';

import Styles from './curentProfile.module.css';

export function CurrentProfile() {
  const userId = useParams().id;
  console.log(userId, '45454545==========');
  const [currentUser, setCurrentUser] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:4000/profile/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.averageRating.length > 0) {
            const averageRate = Math.ceil(data.averageRating[0].averageRating);
            setRate(averageRate);
          } else {
            const averageRate = 0;
            setRate(averageRate);
          }

          console.log(data.currentUser, 'data from back!!!!!!!');
          setCurrentUser(data.currentUser);
        }
      }
    )();
  }, []);

  console.log(rate, 'averageRate');

  return (

    <div className={Styles.mainbox}>
      <div className={Styles.imgBox}>
        <img
          className={Styles.avatar}
          src={currentUser.userpic || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
          alt="foto"
        />
        <h3>Rate:</h3>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="read-only"
            value={Number(rate)}
            readOnly
          />
        </Box>
      </div>

      <div className={Styles.userInfo}>
        <h3>
          Name:
          {' '}
          {currentUser.name}
        </h3>
        <h3>
          Surname:
          {' '}
          {currentUser.surname}
        </h3>
        <h3>
          Email:
          {' '}
          {currentUser.email}
        </h3>
        <h3>
          Bio:
          {' '}
          {currentUser.bio}
        </h3>
      </div>
    </div>
  );
}
