import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../QuestionForm';
import style from './style.module.css';

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [qBtnClicked, setQBtnClicked] = useState(false);

  return (
    <div className={style.flexcontainer}>
      {isAuth
        ? (
          <span>
            {qBtnClicked
              ? (
                <QuestionForm />
              )
              : <button type="button" onClick={() => setQBtnClicked(true)}>Ask an expert your question</button>}
          </span>
        )
        : <button type="button" onClick={() => navigate('/login')}>Sign In to ask question</button>}
    </div>
  );
}
