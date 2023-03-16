/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.css';
import { turnServerConfig } from './turnServerConfig';

export default function QuestionPage() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [question, setQuestion] = useState({});
  const { id } = useParams();
  const [err, setErr] = useState('');

  useEffect(() => {
    setErr('');
    const abortController = new AbortController();
    const { signal } = abortController;
    (async () => {
      const response = await fetch(`http://localhost:4000/question/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        signal,
      });
      const data = await response.json();
      console.log(data);
      setQuestion(data);
    })();

    return () => abortController.abort();
  }, []);

  const handleSolveClick = async () => {
    setErr('');
    try {
      const response = await fetch(`http://localhost:4000/question/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setQuestion((state) => ({ ...state, status: false }));
        // navigate('/');
        console.log(response);
      } else {
        throw new Error('error communicating with server');
      }
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };

  const makeCall = async () => {
    const myPeerConnection = new RTCPeerConnection(turnServerConfig);
    console.log(turnServerConfig);
  };

  return (
    <div className={style.flexcontainer}>
      {question
        ? (

          <div className={style.container}>
            <button type="button" onClick={makeCall}>Share Your Screen</button>
            <video id="localVideo" autoPlay playsInline controls={false} />
            {!question.status
            && <div className={style.status}>Completed</div>}
            <div className={style.title}>
              {question.title}
            </div>
            { question.Subjects
        && (
          <>
            <div className={style.tagsContainer}>
              { question.Subjects.map((s) => (
                <span
                  key={s.id}
                  className={style.tags}
                >
                  {s.title}
                </span>
              ))}
            </div>
            <div className={style.price}>
              {question.price}
            </div>
          </>
        )}
            <div className={style.text}>
              {question.text}
            </div>
            <div className={style.error}>{err.message}</div>
            {user.id === question?.User?.id && question.status
        && <button type="button" onClick={handleSolveClick} className={style.solvedBtn}>Solved</button>}
          </div>
        )
        : <div>Nothing Found</div>}
    </div>
  );
}
