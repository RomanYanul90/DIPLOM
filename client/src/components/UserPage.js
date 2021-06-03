import React, {useState, useCallback, useContext, useEffect} from "react";
import {useParams, useHistory, Link} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";

export const UserPage = () => {
  const {token} = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [user, setUser] = useState(null);
  const history = useHistory();

  const userId = useParams().id;
  const id = auth.userId;

  const getUser = useCallback(async () => {
    try {
      const result = await request(`/api/auth/user/${id}`, "GET", null, {Authorization: `Bearer ${token}`});
      console.log(result);
      setUser(...result);
    } catch (e) {
    }
  }, [token, id, request]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const editRedirect = () => {
    history.push(`/editUser/${id}`);
  };

  const removeRedirect = () => {
    history.push(`/deleteUser/${id}`);
  };

  if (loading) {
    return <LoadingPage/>;
  }
  return (
    <>
      {user &&
      <div className='user-page'>
        <p>User name: {user.userName}</p>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Phone number: {user.phone}</p>
        <div className='edit-remove-btns'>
          <button className='btn' onClick={editRedirect}>Edit</button>
          <button className='btn' onClick={removeRedirect}>Delete</button>
        </div>
      </div>
      }
    </>
  );
};