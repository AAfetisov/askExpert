import { Avatar, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { Slider } from './Myslider';
import Marquee from 'react-fast-marquee';
import styles from './TopExperts.module.css';

export function TopExperts() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const getAllExperts = async () => {
      const response = await fetch('http://localhost:4000/topexperts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        setExperts(result);
      }
    };
    getAllExperts();
  }, []);

  // if (experts) {
  //   console.log(experts[0].averageRating, 'experts<=============');
  // }

  return (
    <>
      <div className={styles.TopExpertsName}>Top Experts</div>
      <Marquee className={styles.marquee}>
        <div className={styles.expertBox}>
          {experts?.length
            && experts?.map((el) => (
              <div key={el['User.id']} className={styles.nameBox}>
                <Avatar
                  alt="Remy Sharp"
                  src={el['User.userpic']}
                  sx={{ width: 50, height: 50 }}
                />
                <div>
                  {el['User.name']}
                  {el['User.surname']}
                </div>
                <div>
                  <Rating
                    name="read-only"
                    value={Number(el.averageRating)}
                    readOnly
                  />
                </div>

              </div>
            ))}
        </div>
      </Marquee>
    </>

  );
}
