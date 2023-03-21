/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Styles from './rate.module.css';

export function Rate() {
  const [value, setValue] = useState('');
  // const [hover, setHover] = useState(-1);

  const id = 1;
  const expertId = 2;

  const onClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/rating/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, expertId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data, 'data from back!!!!!!!');
        // setCurrentUser(data);
      }
    } catch (error) {
      console.log('Error:');
    }
  };

  return (
    <div className={Styles.container_ratings}>
      <div className={Styles.astar_rating} id="averageRating">
        <input onClick={onClick} type="radio" name="astars" id="astar-a" value="5" />
        <label htmlFor="astar-a" />
        <input type="radio" name="astars" id="astar-b" value="4" />
        <label htmlFor="astar-b" />
        <input type="radio" name="astars" id="astar-c" value="3" />
        <label htmlFor="astar-c" />
        <input type="radio" name="astars" id="astar-d" value="2" />
        <label htmlFor="astar-d" />
        <input type="radio" name="astars" id="astar-e" value="1" />
        <label htmlFor="astar-e" />
      </div>
    </div>
  );
}
