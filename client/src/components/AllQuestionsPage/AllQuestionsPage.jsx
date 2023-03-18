import React, { useState, useEffect } from 'react';
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
      }
    };
    getAllQuestion();
  }, []);

  return (
    <>
      <div className={styles.allQuestionsPage}>All questions</div>
      <div>
        {allQuestion.map((question) => <p>{question.title}</p>)}
      </div>
    </>
  );
}
