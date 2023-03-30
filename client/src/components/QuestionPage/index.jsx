/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatGPT from '../chatGPT';
import HoverRating from '../Modal/Rating';
import OffersForTheQuestion from './OffersForTheQuestion';
import ScreenShare from './ScreenShare';
// import { receiveSignalMessage, sendSignalMessage, turnServerConfig } from './signallingChannel';
import style from './style.module.css';

export default function QuestionPage() {
  // const navigate = useNavigate();
  // const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const [question, setQuestion] = useState({});
  const { id } = useParams();
  const [offeredHelp, setOfferHelp] = useState(null);
  const [price, setPrice] = useState(1);
  const [err, setErr] = useState('');
  // const [invitationToVideo, setInvitationToVideo] = useState(null);
  const [recipientId, setRecipientId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      console.log(data);
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
        setOpen(true);
        // setTimeout(() => { setOpen(true); }, 300);
        setQuestion((state) => ({ ...state, status: false }));
      } else {
        throw new Error('error communicating with server');
      }
    } catch (error) {
      setErr(error);
    }
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

  const handelPay = () => {};

  const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div>
        {/* <Button onClick={handleOpen}>Please rate expert</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={style.modalBox}
        >
          <Box sx={modalstyle}>
            <HoverRating questionId={id} setOpen={setOpen} />
          </Box>
        </Modal>
      </div>
      <div className={style.flexcontainer}>
        {question ? (
          <>
            <div className={style.container_left}>
              <div
                className={style.userpic}
                style={{ backgroundImage: `url(${question?.User?.userpic})`, backgroundSize: 'cover' }}
              />
              <div className={style.name}>{question?.User?.name}</div>
              <div className={style.name}>{question?.User?.surname}</div>
              <div className={style.priceTitle}>question price:</div>
              <div className={style.price}>{question?.price}</div>
              {user.id === question?.User?.id && question.status
                && (
                  <>
                    <button
                      type="button"
                      onClick={handleSolveClick}
                      className={style.solvedBtn}
                    >
                      Solved
                    </button>
                    <div />
                  </>
                )}
            </div>

            <div className={style.container_right}>
              {!question.status && <div className={style.status}>Completed</div>}
              <div className={style.title}>{question.title}</div>
              {question.Subjects && (
              <div className={style.tagsContainer}>
                {question.Subjects.map((s) => (
                  <span key={s.id} className={style.tags}>
                    {s.title}
                  </span>
                ))}
              </div>
              )}
              <div className={style.textTitle}>Problem description:</div>
              <div className={style.text}>{question.text}</div>
              <div className={style.error}>{err.message}</div>
              {user.id === question?.User?.id && question.status && (
              <>
                <OffersForTheQuestion
                  questionId={id}
                  setRecipientId={setRecipientId}
                />
                {recipientId && (
                  <>
                    <ChatGPT questionId={id} recipientId={recipientId} />
                    <ScreenShare questionId={id} recipientId={recipientId} />
                  </>
                )}
              </>
              )}
              {user.id !== question?.User?.id && question.status && (
              <div>
                {offeredHelp ? (
                  <div>
                    <div className={style.helpOffered}>
                      <span>Help offered for</span>
                      <span className={style.offeredPrice}>
                        {offeredHelp.price}
                      </span>
                    </div>
                    {question?.userId && (
                      <>
                        <ChatGPT questionId={id} recipientId={question.userId} />
                        <ScreenShare questionId={id} recipientId={question.userId} />
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <input
                      className={style.offerInp}
                      type="number"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                    <button type="button" onClick={handleOfferHelp}>
                      Offer Help
                    </button>
                  </>
                )}
              </div>
              )}
            </div>
          </>
        ) : (
          <div>Nothing Found</div>
        )}
      </div>
    </>
  );
}
