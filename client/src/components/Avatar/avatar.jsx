import React from "react";
import Styles from "./avatar.module.css";

export function Avatar() {
  return (
    <>
      <div className={Styles.imgBox}>
        <img
          className={Styles.avatar}
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="foto"
        ></img>
        <button className={Styles.btn}>Change avatar </button>
      </div>
    </>
  );
}
