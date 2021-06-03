import React from "react";

export const UserForm = (props) => {
  return (
    <form className='basic-form'>
      <div>
        <label htmlFor='firstName'>First name</label>
        <input id='firstName' type="text" name="firstName" defaultValue={props.defaultValues[0]}
               onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='lastName'>Last name</label>
        <input id='lastName' type="text" name="lastName" defaultValue={props.defaultValues[1]}
               onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='userName'>User name</label>
        <input id='userName' type="text" name="userName" defaultValue={props.defaultValues[2]}
               onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type="email" name="email" defaultValue={props.defaultValues[3]}
               onChange={props.changeHandler}/>
      </div>
      <div>
        <label htmlFor='phone'>Phone</label>
        <input id='phone' type="text" name="phone" defaultValue={props.defaultValues[4]}
               onChange={props.changeHandler}/>
      </div>
      {props.isCreatePage &&
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' type="password" name="password" onChange={props.changeHandler}/>
      </div>}
      <button className='btn' onClick={props.submitMethod}>Submit</button>
    </form>
  );
};