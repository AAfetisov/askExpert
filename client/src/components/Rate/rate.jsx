/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Styles from './rate.module.css';

export function Rate() {
  return (
    <div className={Styles.container_ratings}>
      <span>Average rating:</span>
      <div className={Styles.astar_rating} id="averageRating">
        <input type="radio" name="astars" id="astar-a" value="5" />
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
