import React, { useEffect } from 'react';
import QuestionForm from '../QuestionForm';
import './style.module.css';

export default function Main() {
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    // dispatch(getTodoTh(signal));
    return () => abortController.abort();
  }, []);

  return (
    <QuestionForm />
  );
}
