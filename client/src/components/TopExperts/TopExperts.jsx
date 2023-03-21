import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
      <div className={styles.expertBox}>
        {experts?.length
            && experts?.map((el) => (
              <div key={el['User.id']} className={styles.nameBox}>
                <img src={el['User.userpic']} alt="avatar" />
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
    </>

  );
}
