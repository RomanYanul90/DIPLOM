import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";
import {AuthContext} from "../context/AuthContext";

export const LoginPage = () => {
  const auth = useContext(AuthContext);
  const {error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await request("/api/auth/login", "POST", {...form});
      auth.login(data.token, data.userId);
      history.push(`/userPage/${data.userId}`);
    } catch (e) {
    }
  };
  return (
    <section className='login-section'>
      <h2>Log in</h2>
      <form>
        <div className='login-form'>
          <div className='login-form-labels'>
            <label htmlFor='email'>Email</label>
            <label htmlFor='password'>Password</label>
          </div>
          <div className='login-form-inputs'>
            <input id='email' type="email" name="email" onChange={changeHandler}/>
            <input id='password' type="password" name="password" onChange={changeHandler}/>
          </div>
        </div>

        <button className='btn' onClick={loginHandler}>Log in</button>
      </form>
    </section>
  );
};