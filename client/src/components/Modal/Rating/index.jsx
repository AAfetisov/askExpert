import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

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

export default function HoverRating() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  console.log(value, 'value=====');
  const userId = 2;
  const expertId = 1;

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:4000/rating/${userId}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value, expertId }),
        });
        console.log(response, 'response');
      }
    )();
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
