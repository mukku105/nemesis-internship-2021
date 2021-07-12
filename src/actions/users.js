import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_USERS, ADD_USER, UPDATE_USERS, DELETE_USER } from "./types";

//GET USERS
export const getUsers = () => (dispatch) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//UPDATE USERS
export const updateUser = (user) => (dispatch) => {
  axios
    .patch(`https://jsonplaceholder.typicode.com/users/${user.id}/`, user)
    .then((res) => {
      dispatch(createMessage({ updateUser: "User Updated" }));
      dispatch({
        type: UPDATE_USERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//ADD USER
export const addUser = (user) => (dispatch) => {
  axios
    .post("https://jsonplaceholder.typicode.com/users/", user)
    .then((res) => {
      dispatch(createMessage({ addUsers: "User Added" }));
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//DELETE USERS
export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}/`)
    .then((res) => {
      dispatch(createMessage({ deleteUsers: "User Deleted" }));
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};
