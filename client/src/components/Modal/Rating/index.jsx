import StarIcon from '@mui/icons-material/Star';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './rating.module.css';

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
        } else {
          const transactions = await response.json();
          console.log('transactions', transactions);
        }
      }
    )();
  }, []);

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
    <div className={styles.Box}>
      {experts.length > 0
        && experts.map((exp, ind) => (
          <div className={styles.info}>
            {/* <Avatar
              alt="Remy Sharp"
              src={exp.User.userpic || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
              sx={{ width: 50, height: 50 }}
            /> */}
            <div key={exp.id}>
              <div className={styles.centred}>
                {exp.User.name}
                {exp.User.surname}
              </div>
              <Box
                sx={{
                  width: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
          </div>
        ))}
      <div className={styles.Btn}>
        <Link to="/">
          <button type="button">OK</button>
        </Link>
      </div>
    </div>
  );
}
