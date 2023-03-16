/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import style from './Subscribe.module.css';

export default function Subscribe() {
  // const [user, setUser] = useState([]);
  // const [title, setTitle] = useState('');
  // const [text, setText] = useState('');
  // const [price, setPrice] = useState(1);
  // const [tags, setTags] = useState([]);
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
      <div>My subscribe</div>
      <Table striped="columns">
        <thead>
          <tr>
            <th>Offer</th>
            <th>Expert</th>
            <th>Tags</th>
            <th>Title</th>
            <th>Text</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {' '}
          {(offer.length
            && offer.map(({
              Subjects, id, expertId, questionId, title, text, price,
            }) => (
              <tr key={id}>
                <td>{Subjects.map((el) => el.title)}</td>
                <td>
                  <Link to={`/subscribe/${id}`}>{title}</Link>
                </td>
                <td>{expertId}</td>
                <td>{questionId}</td>
                <td>{text}</td>
                <td>{price}</td>
              </tr>
            ))) || <div>There is no question now</div>}
        </tbody>
      </Table>
    </>
  );
}
