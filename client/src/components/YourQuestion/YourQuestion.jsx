/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable comma-dangle */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import style from './YourQuestion.module.css';

import styles from './YourQuestion.module.css';

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
      <br />
      <div className={styles.yourQuestionModule}>My questions</div>
      <br />
      <table className={styles.yourQuestionModuleTable}>
        <thead>
          <tr>
            <th>Tags</th>
            <th>Question</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {question?.length
            && question?.map(({
              Subjects, id, title, price, createdAt,
            }) => (
              <tr key={id}>
                <td>
                  {Subjects.map((s) => (
                    <span key={s.id} className={styles.tag}>
                      {s.title}
                    </span>
                  ))}
                </td>
                <td>
                  <Link to={`/question/${id}`}>{title}</Link>
                </td>
                <td>{price}</td>
                <td>
                  {new Date(createdAt).toLocaleDateString()}
                  {' '}
                  {new Date(createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
