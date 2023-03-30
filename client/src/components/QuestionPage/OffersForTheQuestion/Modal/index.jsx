/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import style from './Modal.module.css';

export default function Modalwindow(props) {
  const {
    show, message, onConfirm, onCancel,
  } = props;
  if (!show) {
    return null;
  }
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <p>{message}</p>
        <div className={style.modalActions}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
