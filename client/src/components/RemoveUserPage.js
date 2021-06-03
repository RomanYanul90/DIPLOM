import React, {useCallback, useContext} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const RemoveUserPage = () => {
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const userId = useParams().id;
  //TODO  рассказать про то как можно удалить юзера используя используя useParams().id
  const history = useHistory();

  const removeUser = useCallback(async (e) => {
    e.preventDefault();

    try {
      await request(`/api/auth/deleteUser/${auth.userId}`, "DELETE", null, {Authorization: `Bearer ${auth.token}`});
      auth.logout();
      history.push("/");
    } catch (e) {
    }
  }, [auth, history, request]);

  return (
    <div className='delete-msg'>
      <h2>Are you sure you want to delete current user?</h2>
      <button className='btn' onClick={removeUser}>Delete</button>
    </div>
  );
};