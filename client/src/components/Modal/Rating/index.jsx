import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

// eslint-disable-next-line react/prop-types
export default function HoverRating({ questionId }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  console.log(value, 'value=====');
  const userId = 2;
  const expertId = 1;

  useEffect(() => {
    // по questionId в бд находим транзакции и вытаскиваем из них айди экспертов

    (
      async () => {
        const response = await fetch(`http://localhost:4000/transaction/question/${questionId}`, {
          method: 'get',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const transactions = response.json();
          console.log(transactions);
        }
      }
    )();

    // (
    //   async () => {
    //     const response = await fetch(`http://localhost:4000/rating/${userId}`, {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ value, expertId }),
    //     });
    //     console.log(response, 'response');
    //   }
    // )();
  }, [value]);

  return (
    <>
      <Typography
        variant="h6"
        id="login-modal-title"
        gutterBottom
      >
        <Box>
          Please rate this user:
        </Box>
        Name:
        {' '}
        {expertId}
      </Typography>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    </>
  );
}
