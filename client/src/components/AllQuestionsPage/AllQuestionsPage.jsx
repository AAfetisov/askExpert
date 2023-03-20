/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AllQuestionsPage.module.css';

export default function AllQuestion() {
  const [allQuestion, setAllQuestion] = useState([]);

  useEffect(() => {
    const getAllQuestion = async () => {
      const response = await fetch('http://localhost:4000/allquestions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const result = await response.json();
        setAllQuestion(result);
        // console.log('🚀🚀 ~ file: AllQuestionsPage.jsx:19 ~ getAllQuestion ~ result:', result);
      }
    };
    getAllQuestion();
  }, []);

  return (
    <>
      <div className={styles.allQuestionsPage}>All Questions</div>
      <br />
      <table className={styles.tableAllQuestionsPage}>
        <thead>
          <tr>
            <th>Created by</th>
            <th>Tags</th>
            <th>Question</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allQuestion?.length && allQuestion?.map((el) => (
            <tr key={el.id} className={styles.allQuestions}>
              <td>
                {el.User.name}
                {' '}
                {el.User.surname}
              </td>
              <td>{el.Subjects.map((s) => <span key={s.id} className={styles.tag}>{s.title}</span>)}</td>
              <td>
                <Link to={`/question/${el.id}`}>
                  {el.title}
                </Link>
              </td>
              <td>{el.price}</td>
              <td>
                {new Date(el.createdAt).toLocaleDateString()}
                {' '}
                {new Date(el.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className={styles.allQuestionsPage}>All questions</div>
      <div>
        {allQuestion.map((question) => <p>{question.title}</p>)}
      </div>
      <div>
        {allQuestion.map((question) => <p>{question.text}</p>)}
      </div>
      <div>
        {allQuestion.map((question) => <p>{question.price}</p>)}
      </div>
      <div>
        {allQuestion.map((Subjects) => <p>{Subjects.title}</p>)}
      </div> */}
    </>
  );
}
