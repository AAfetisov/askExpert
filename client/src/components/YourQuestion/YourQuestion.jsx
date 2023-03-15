/* eslint-disable no-mixed-operators */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from "react";

export default function YourQuestion() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await fetch("http://localhost:4000/myquestion", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setQuestion(result);
      }
    };
    getQuestion();
  }, []);

  return <div> {question.length && question.map(({ id, title, text }) => <div key={id}> title={title} text={text} </div>) || "There is no question now"}</div>;
}
