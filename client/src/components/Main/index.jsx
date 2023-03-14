import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../QuestionForm';
import style from './style.module.css';

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    // dispatch(getTodoTh(signal));
    return () => abortController.abort();
  }, []);

  return (
    <div className={style.flexcontainer}>
      {isAuth
        ? <QuestionForm />
        : <button type="button" onClick={() => navigate('/login')}>Sign In to ask question</button>}
    </div>
  );
}
