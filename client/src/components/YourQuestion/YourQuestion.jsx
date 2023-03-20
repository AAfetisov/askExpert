import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from './YourQuestion.module.css';

export default function YourQuestion() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await fetch('http://localhost:4000/myquestion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        setQuestion(result);
      }
    };
    getQuestion();
  }, []);

  return (
    <>
      <div>My question</div>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th}>Tags</th>
            <th className={style.th}>Title</th>
            <th className={style.th}>Text</th>
            <th className={style.th}>Price</th>
          </tr>
        </thead>
        <tbody>
          {(question.length
            && question.map(({
              Subjects, id, title, text, price,
            }) => (
              <tr key={id}>
                <td className={style.td}>{Subjects.map((el2) => el2.title)}</td>
                <td className={style.td}>
                  <Link to={`/question/${id}`}>{title}</Link>
                </td>
                <td className={style.td}>{text}</td>
                <td className={style.td}>{price}</td>
              </tr>
            ))) || <div>There is no question now</div>}
        </tbody>
      </table>
    </>
  );
}
