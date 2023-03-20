/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AllQuestion from '../AllQuestionsPage/AllQuestionsPage';
import QuestionForm from '../QuestionForm';
import ScreenShare from '../ScreenShare';
import Subscribe from '../Subscribe/Subscribe';
import YourQuestion from '../YourQuestion/YourQuestion';
import style from './style.module.css';

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [qBtnClicked, setQBtnClicked] = useState(false);

  return (
    <div className={style.flexcontainer}>
      {isAuth ? (
        <>
          <ScreenShare />
          <span>
            {qBtnClicked ? (
              <QuestionForm />
            ) : (
              <button className={style.button} type="button" onClick={() => setQBtnClicked(true)}>
                Ask an expert your question
              </button>
            )}
          </span>
          <YourQuestion />
          <Subscribe />
          <AllQuestion />
        </>
      ) : (
        <>
          <button className={style.button} type="button" onClick={() => navigate('/login')}>
            Sign In to ask question
          </button>
          <div className={style.infobox}>
            <img src="Fon.jpg" alt="fon" />
            <div className={style.title}>
              <h2>Ask an expert</h2>
              <h3>
                There will always be an answer to your question.
                We use technologies that carefully protect your data.
              </h3>

            </div>
          </div>

        </>

      )}
    </div>
  );
}
