/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import AllQuestion from '../AllQuestionsPage/AllQuestionsPage';
import QuestionForm from '../QuestionForm';
import Subscribe from '../Subscribe/Subscribe';
import YourQuestion from '../YourQuestion/YourQuestion';
import style from './style.module.css';
import { TopExperts } from '../TopExperts/TopExperts';

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [qBtnClicked, setQBtnClicked] = useState(false);
  const [runningTags, setRunningTags] = useState([]);

  useEffect(() => {
    const getRunningTags = async () => {
      const response = await fetch('http://localhost:4000/allquestions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        setRunningTags(result);
      }
    };
    getRunningTags();
  }, []);

  return (
    <div className={style.flexcontainer}>
      {isAuth ? (
        <>
          <div className={style.marqueeContainer}>
            <Marquee speed={21}>
              {runningTags.map((el) => (
                <span className={style.betweenTagFlex} key={el.id}>{el.Subjects[0].title}</span>
              ))}
            </Marquee>
          </div>
          <span>
            {qBtnClicked ? (
              <QuestionForm />
            ) : (
              <button className={style.buttonAsk} type="button" onClick={() => setQBtnClicked(true)}>
                Ask an expert your question
              </button>
            )}
          </span>
          <YourQuestion />
          <Subscribe />
          <AllQuestion />
          <TopExperts />
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
