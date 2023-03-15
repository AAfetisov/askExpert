/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../QuestionForm";
import YourQuestion from "../YourQuestion/YourQuestion";
import style from "./style.module.css";

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [qBtnClicked, setQBtnClicked] = useState(false);

  return (
    <div className={style.flexcontainer}>
      {isAuth ? (
        <>
          <span>
            {qBtnClicked ? (
              <QuestionForm />
            ) : (
              <button type="button" onClick={() => setQBtnClicked(true)}>
                Ask an expert your question
              </button>
            )}
          </span>
          <YourQuestion />
        </>
      ) : (
        <button type="button" onClick={() => navigate("/login")}>
          Sign In to ask question
        </button>
      )}
    </div>
  );
}
