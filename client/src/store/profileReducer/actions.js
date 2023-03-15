import { useNavigate } from "react-router-dom";
import ATypes from "../types";

export const updateUserAC = (user) => ({
  type: ATypes.UPDATE_USER,
  payload: { user },
});

export const updateUser = (arg) => async (dispatch) => {
  const response = await fetch("http://localhost:4000/profile/form", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ user: arg }),
  });

  if (!response.ok) {
    throw new Error(`status - ${response.status}, ${response.statusText}`);
  }

  const result = await response.json();

  console.log(result, "result from back");

  const user = {
    id: result.id,
    name: result.name,
    surname: result.surname,
    email: result.email,
    password: result.password,
    bio: result.bio,
  };

  dispatch(updateUserAC(user));
};

export const refreshUserAC = (user) => ({
  type: ATypes.REFRESH_USER,
  payload: { user },
});

export const refreshUser = (arg) => async (dispatch) => {
  const response = await fetch("http://localhost:4000/profile/form", {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`status - ${response.status}, ${response.statusText}`);
  }

  const result = await response.json();

  console.log(result, "result from back");

  const user = {
    id: result.id,
    name: result.name,
    surname: result.surname,
    email: result.email,
    password: result.password,
    bio: result.bio,
  };

  dispatch(refreshUserAC(user));
};
