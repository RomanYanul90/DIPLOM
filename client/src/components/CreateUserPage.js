import React, {useState, useEffect} from "react";
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";
import {UserForm} from "./statelessComponents/UserForm";
import {useHistory} from "react-router-dom";

export const CreateUserPage = () => {
  const {error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
  });
  const message = useMessage();
  const history = useHistory();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const createUserHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await request("/api/auth/register", "POST", {...form});
      message(data.message);
      history.push("/login");
    } catch (e) {
    }
  };

  return (
    <section className='create-user-section'>
      <h2>Create user</h2>
      <UserForm
        changeHandler={changeHandler}
        submitMethod={createUserHandler}
        defaultValues={[]}
        isCreatePage={true}
      />
    </section>
  );
};