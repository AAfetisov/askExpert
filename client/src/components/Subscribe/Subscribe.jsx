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
      <div className={styles.SubscribeBox}>
        <h2>My subscribe</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>User email</th>
            <th>Question title</th>
            <th>Offer text</th>
            <th>Offer Price</th>
          </tr>
        </thead>
        <tbody>
          {offer?.length && offer?.map((el) => (
            <tr key={el.id}>
              <td>{el.Question.User.email}</td>
              <td>{el.Question.title}</td>
              <td>{el.text}</td>
              <td>{el.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        {offer?.length
            && offer?.map((of) => <div key={of.id}>{of.Question.title}</div>)}
      </div>
      <div>
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
      </div> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <Table striped="columns">
        <thead>
          <tr>
            <th>Title</th>
            <th>Useremail</th>
            <th>Text</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {(offer?.length
            && offer?.map(({
              Question, Offers, id, User, email, title, price,
            }) => (
              <tr key={id}>
                <td>{Question?.map((of) => of.title)}</td>
                <td>{Question.User?.map((of) => of.email)}</td>
                <td>
                  <Link to={`/subscribe/${id}`}>{title}</Link>
                </td>
                <td>{price}</td>
              </tr>
            ))) || <div>There is no question now</div>}
        </tbody>
      </Table> */}
    </>
  );
}
