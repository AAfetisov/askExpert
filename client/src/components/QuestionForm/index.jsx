import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import style from './style.module.css';

export default function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [price, setPrice] = useState(1);

  //   useEffect(() => {
  //     const abortController = new AbortController();
  //     const { signal } = abortController;
  //     // dispatch(getTodoTh(signal));
  //     return () => abortController.abort();
  //   }, []);

  const handleQInp = (e) => {
    setQuestion(() => e.target.value);
  };
  const handlePriceInp = (e) => {
    setPrice((state) => (e.target.validity.valid ? e.target.value : state));
  };
  const handleSubmitClick = async (e) => {
    const response = await fetch('http://localhost:4000/question', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ question, price }),
    });
    if (response.ok) {
      console.log('ok');
    }
  };

  return (
    <div className={style.flexcontainer}>
      <form>
        <input type="text" name="question" onChange={handleQInp} value={question} />
        <input type="number" pattern="[0-9]*" name="price" onChange={handlePriceInp} value={price} min="1" max="100000" />
        <button type="button" onClick={handleSubmitClick}>Submit</button>
      </form>
    </div>
  );
}
