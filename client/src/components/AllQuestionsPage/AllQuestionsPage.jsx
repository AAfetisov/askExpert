/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './AllQuestionsPage.module.css';

export default function AllQuestion() {
  const [allQuestion, setAllQuestion] = useState([]);
  const [sortAllQuestionsPrice, setSortAllQuestionPrice] = useState(false);
  const [sortAllQuestionsDate, setSortAllQuestionDate] = useState(false);
  const [style, setStyle] = useState(false);
  const [questionsFiltered, setQuestionsFiltered] = useState([]);

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
        setQuestionsFiltered(result);
        // console.log('🚀🚀 ~ file: AllQuestionsPage.jsx:19 ~ getAllQuestion ~ result:', result);
      }
    };
    getAllQuestion();
  }, []);

  const hendelSortPrice = () => {
    const result = [...questionsFiltered]
      .sort((a, b) => (sortAllQuestionsPrice ? b.price - a.price : a.price - b.price));
    setSortAllQuestionPrice((prevState) => !prevState);
    setQuestionsFiltered(result);
  };

  const hendelSortDate = () => {
    const result = [...questionsFiltered]
      .sort((a, b) => (sortAllQuestionsDate ? +new Date(b.createdAt) - +new Date(a.createdAt) : +new Date(a.createdAt) - +new Date(b.createdAt)));
    setSortAllQuestionDate((prevState) => !prevState);
    setQuestionsFiltered(result);
  };

  const hendelTag = (titles, e) => {
    const newSub = [...allQuestion].map((el) => el.Subjects).flat().filter((elem) => elem.title === titles);
    const newTag = newSub.map((el) => el.Tag.questionId).map((elem) => elem);
    const result = [];
    for (let i = 0; i < newTag.length; i += 1) {
      result.push([...allQuestion].filter((el) => el.id === newTag[i]));
    }
    setAllQuestion(result.flat());
    setStyle(true);
  };

  const hendelDef = async () => {
    const response = await fetch('http://localhost:4000/allquestions', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      const result = await response.json();
      setAllQuestion(result);
      setStyle(false);
    }
  };

  const [tagfilter, setTagfilter] = useState([]);
  useEffect(() => {
    console.log('tagfilter changed');
    const filtered = allQuestion?.filter(
      (q) => tagfilter.every(
        (tag) => q.Subjects.map((s) => s.title).includes(tag),
      ),
    );
    setQuestionsFiltered(filtered);
  }, [tagfilter]);

  const handleTagClick = (title, id, e) => {
    if (tagfilter.includes(title)) { return; }
    setTagfilter((state) => [...state, title]);
  };

  const handleTfClick = (i) => {
    const arr = [...tagfilter];
    arr.splice(i, 1);
    setTagfilter(arr);
  };

  return (
    <>
      <div className={styles.allQuestionsPage}>All Questions</div>
      {/* <button type="button" className={style ? styles.buttonAllfree : styles.buttonAllview} onClick={hendelDef}>Back to All Questions</button> */}
      {tagfilter.length > 0
        && <div className={styles.tagfilter}>{tagfilter?.map((tf, i) => <span key={tf} onClick={() => handleTfClick(i)}>{tf}</span>)}</div>}

      <table className={styles.tableAllQuestionsPage}>
        <thead>
          <tr>
            <th>Created by</th>
            <th>Tags</th>
            <th>Question</th>
            <th onClick={hendelSortPrice}>Price</th>
            <th onClick={hendelSortDate}>Date</th>
          </tr>
        </thead>
        <tbody>
          {questionsFiltered?.length
            && questionsFiltered?.map((el) => (
              <tr key={el.id} className={styles.allQuestions}>
                <td>
                  <Link to={`/profile/${el.userId}`}>
                    {el.User.name}
                    {el.User.surname}
                  </Link>
                </td>
                <td>
                  {el.Subjects.map((s) => (
                    <span onClick={(e) => { /* hendelTag(s.title, e); */ handleTagClick(s.title, s.id, e); }} key={s.id} className={styles.tag}>
                      {s.title}
                    </span>
                  ))}
                </td>
                <td>
                  <Link to={`/question/${el.id}`}>{el.title}</Link>
                </td>
                <td>
                  {/* <td className={styles.snowflakes} aria-hidden="true"> */}
                  {/* <div className="snowflakes" aria-hidden="true">
                    <div className={styles.snowflake}>
                      ❅
                    </div>
                    <div className={styles.snowflake}>
                      ❅
                    </div>
                    <div className={styles.snowflake}>
                      ❆
                    </div>
                    <div className={styles.snowflake}>
                      ❄
                    </div>
                    <div className={styles.snowflake}>
                      ❅
                    </div>
                    <div className={styles.snowflake}>
                      ❆
                    </div>
                    <div className={styles.snowflake}>
                      ❄
                    </div>
                    <div className={styles.snowflake}>
                      ❅
                    </div>
                    <div className={styles.snowflake}>
                      ❆
                    </div>
                    <div className={styles.snowflake}>
                      ❄
                    </div>
                  </div> */}
                  {el.price}
                </td>
                <td>
                  {new Date(el.createdAt).toLocaleDateString()}
                  {' '}
                  {new Date(el.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
