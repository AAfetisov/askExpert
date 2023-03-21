/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [price, setPrice] = useState(1);
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();
  const handlePriceInp = (e) => {
    setPrice((state) => (e.target.validity.valid ? e.target.value : state));
  };

  const handleTitleInp = (e) => {
    setTags([]);
    const curInput = e.target.value;
    const matchedTagArray = e.target.value.match(/\[([^\]]+)\]/);

    if (matchedTagArray) {
      const tagsArr = matchedTagArray.at(1).split(',').map((elem) => elem.trim());
      setTags(() => tagsArr);
    }
    setTitle(() => curInput);
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const closingBracketIndex = title.indexOf(']');
    const realTitle = title.substring(closingBracketIndex + 1);

    try {
      const questionId = await ky.post(
        'http://localhost:4000/question',
        {
          credentials: 'include',
          json: {
            title: realTitle, text, price, tags,
          },
        },
      ).json();

      navigate(`/question/${questionId}`);
    } catch (err) {
      console.log('Error:');
    }
  };

  return (
    <div className={style.flexcontainer}>
      <form className={style.qform}>

        <label htmlFor="titleId">Question title</label>
        <input id="titleId" type="text" name="title" onChange={handleTitleInp} value={title} placeholder="[tag1,tag2,...] - add some tags " />
        <span>
          {tags
        && tags.map((t, ind) => <span className={style.tag} key={ind + 1}>{t}</span>)}

        </span>
        <label htmlFor="priceId">Price</label>
        <input id="priceId" price-attr="" type="number" pattern="[0-9]*" name="price" onChange={handlePriceInp} value={price} min="1" max="100000" />

        <label htmlFor="textId">Text</label>
        <textarea id="textId" type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} />

        <button type="button" className={style.handleSubmitClickGradient} onClick={handleSubmitClick}>Submit</button>
      </form>
    </div>
  );
}
