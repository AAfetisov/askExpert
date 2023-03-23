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
  const [value, setValue] = useState([]);
  const [hover, setHover] = useState(-1);
  const [experts, setExperts] = useState([]);
  // const expertId = 1;

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
          const transactions = await response.json();
          console.log('transactions', transactions);
          // const expertsFromTransactions = transactions.map((tr) => tr.expertId);
          setExperts(transactions);
        }
      }
    )();
  }, []);

  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await fetch(`http://localhost:4000/rating/${userId}`, {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ value }),
  //       });
  //       console.log(response, 'response');
  //     }
  //   )();
  // }, [value]);

  const sendRatingToDb = async (expertId, event, newValue) => {
    console.log(newValue);
    const response = await fetch('http://localhost:4000/rating', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newValue, expertId }),
    });
    if (response.ok) {
      console.log('RATING OK');
    }
    console.log(response, 'response');
  };

  return (
    <Box>
      {experts.length > 0
        && experts.map((exp, ind) => (
          <div key={exp.id}>
            <div>{exp.User.name}</div>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name="simple-controlled"
                value={value[ind]}
                onChange={(event, newValue) => {
                  sendRatingToDb(exp.User.id, event, newValue);
                  const val = [...value];
                  val[ind] = newValue;
                  setValue(val);
                }}
              />
            </Box>
          </div>
        ))}
    </Box>
  );
}
