import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      {offer.length && offer.map((el) => <div key={el.id}>{el.id}</div>)}
    </div>
  );
}
