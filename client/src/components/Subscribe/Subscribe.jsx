/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import styles from './Subscribe.module.css';

export default function Subscribe() {
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/subscribe', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        setOffer(result);
        console.log('🚀 ~ file: Subscribe.jsx:25 ~ result:', result);
      }
    })();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <div className={styles.subscribedOffer}>My subscribe</div>
      <div className={styles.subscribedOffer}>
        {offer?.length
            && offer?.map((of) => <div key={of.id}>{of.Question.title}</div>)}
      </div>
      <div className={styles.subscribedOffer}>
        {offer?.length
            && offer?.map((of) => <div key={of.id}>{of.Question.User.email}</div>)}
      </div>
      <div>
        {offer?.length
            && offer?.map((of) => <div key={of.id}>{of.text}</div>)}
      </div>
      <div>
        {offer?.length
            && offer?.map((of) => <div key={of.id}>{of.price}</div>)}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Table striped="columns">
        <thead>
          <tr>
            <th>Title</th>
            <th>Username</th>
            <th>Tags</th>
            <th>Text</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {(offer.length
            && offer.map(({
              Subjects, Offers, id, Username, title, text, price,
            }) => (
              <tr key={id}>
                <td>{Subjects?.map((el1) => el1.title)}</td>
                <td>{Offers?.map((el3) => el3.title)}</td>
                <td>
                  <Link to={`/subscribe/${id}`}>{title}</Link>
                </td>
                <td>{text}</td>
                <td>{price}</td>
              </tr>
            ))) || <div>There is no question now</div>}
        </tbody>
      </Table>
    </>
  );
}
