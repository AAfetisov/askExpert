/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.css';

export default function OffersForTheQuestion({ questionId, setRecipientId }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    (async () => {
      const response = await fetch(`http://localhost:4000/question/${questionId}/offers`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        signal,
      });

      const data = await response.json();
      setOffers(data);
    })();

    return () => abortController.abort();
  }, []);

  const handleOfferClick = (id, expertId, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(expertId);
    setRecipientId(expertId);
  };

  return (
    <>
      <h3>Offers with help for you:</h3>
      <ul className={style.offers}>
        {offers?.length && offers.map((of) => (
          <a key={of.id} href="dummy" onClick={(e) => handleOfferClick(of.id, of.expertId, e)}>
            <li className={style.offer}>
              <span className={style.userEmail}>{of.User.email}</span>
              <span className={style.price}>{of.price}</span>
            </li>
          </a>
        ))}
      </ul>
    </>
  );
}
