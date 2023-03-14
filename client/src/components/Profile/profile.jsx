// import { style } from "@mui/system";
import React from "react";
import { Avatar } from "../Avatar/avatar";
import { Rate } from "../Rate/rate";
// import "bootstrap/dist/js/popper.min.js";

import Styles from "./profile.module.css";

let user = {
  name: "Bob",
  surname: "Smith",
  email: "bob2001@gmail.com",
  password: "1234",
  bio: "I am Bob",
};

export function Profile() {
  return (
    <div className={Styles.mainbox}>
      <Avatar></Avatar>

      <div className={Styles.userInfo}>
        <h3>Name: {user.name}</h3>
        <h3>Surname: {user.surname}</h3>
        <h3>Email: {user.email}</h3>
        <button>Change your profile</button>
      </div>
      <Rate></Rate>
    </div>
  );
}
