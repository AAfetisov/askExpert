/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChatGPT from '../chatGPT';
import OffersForTheQuestion from './OffersForTheQuestion';
import { receiveSignalMessage, sendSignalMessage, turnServerConfig } from './signallingChannel';
import style from './style.module.css';

export default function QuestionPage() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [question, setQuestion] = useState({});
  const { id } = useParams();
  const [offeredHelp, setOfferHelp] = useState(null);
  const [price, setPrice] = useState(1);
  const [err, setErr] = useState('');
  const [invitationToVideo, setInvitationToVideo] = useState(null);
  const [recipientId, setRecipientId] = useState(null);

  const checkIfUserOfferedHelpToThisQUestion = async () => {
    const response = await fetch(`http://localhost:4000/question/${id}/offer`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      setOfferHelp(data);
      // setRecipientId(question.userId);
    }
  };

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
      setQuestion(data);
    })();
    checkIfUserOfferedHelpToThisQUestion();
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
    const peerConnection = new RTCPeerConnection(turnServerConfig);
    const myOffer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(myOffer);
    sendSignalMessage(2, myOffer);
  };

  const acceptCall = async () => {
    setInvitationToVideo(null);
    console.log(invitationToVideo);
    // receiveSignalMessage(2);
  };

  const handleOfferHelp = async () => {
    const response = await fetch(`http://localhost:4000/question/${id}/offer`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    });
    if (response.ok) {
      const data = await response.json();
      setOfferHelp(data);
    }
  };

  return (
    <div className={style.flexcontainer}>
      {question
        ? (

          <div className={style.container}>
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
        && (
        <>
          <button type="button" onClick={handleSolveClick} className={style.solvedBtn}>Solved</button>
          <OffersForTheQuestion questionId={id} setRecipientId={setRecipientId} />
          {recipientId && <ChatGPT questionId={id} recipientId={recipientId} />}
        </>
        )}
            { user.id !== question?.User?.id && question.status
            && (
            <div>

              {offeredHelp
                ? (
                  <div>
                    Help offered for
                    {' '}
                    {offeredHelp.price}
                    ₽
                    {question?.userId && <ChatGPT questionId={id} recipientId={question.userId} />}
                  </div>
                )
                : (
                  <>
                    <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} value={price} />
                    <button type="button" onClick={handleOfferHelp}>Offer Help</button>
                  </>
                )}
            </div>
            )}

          </div>
        )
        : <div>Nothing Found</div>}
    </div>
  );
}
