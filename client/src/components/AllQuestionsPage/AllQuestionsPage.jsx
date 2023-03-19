import React, { useState, useEffect } from 'react';
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
        console.log('🚀🚀 ~ file: AllQuestionsPage.jsx:19 ~ getAllQuestion ~ result:', result);
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
            <th>User</th>
            <th>Tag</th>
            <th>Question Title</th>
            <th>Question Text</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {allQuestion?.length && allQuestion?.map((el) => (
            <tr key={el.id} className={styles.allQuestions}>
              {/* <td>{User.map((user) => user.name)}</td>
              <td>{Subject.map((sub) => sub.title)}</td>
              <td>
                <Link to={`/question/${id}`}>{question.title}</Link>
              </td> */}
                <td>{el['User.name']}</td>
                <td>{el['Subjects.title']}</td>
                <td>{el.title}</td>
                <td>{el.text}</td>
                <td>{el.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
