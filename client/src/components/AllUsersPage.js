import React, {useState, useContext, useEffect, useCallback} from "react";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {useHttp} from "../hooks/httpHook";
import {UsersList} from "./UsersList";

export const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState({userName: ""});
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/auth/", "GET", null,
        {Authorization: `Bearer ${token}`}
      );
      setUsers(fetched);
    } catch (e) {
    }
  }, [token, request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <LoadingPage/>;
  }

  const changeInputHandler = (e) => {
    setSearchParams({userName: e.target.value});

  };
  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const fetched = await request(`/api/auth/byUserName/${searchParams.userName}`, "GET", null,
        {Authorization: `Bearer ${token}`}
      );
      setUsers(fetched);
    } catch (e) {
    }
  };

  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <section className='users-section'>
      <form className='search-form'>
        <label htmlFor='userName'>Find user by username</label>
        <div className='search-form-input'>
          <input id='userName' type='text' name='userName' placeholder='UserName:' onChange={changeInputHandler}/>
          <button className='btn' onClick={searchHandler}>Search</button>
        </div>
      </form>
      {!loading && <UsersList users={users}/>}
    </section>
  );
};