import React from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {CreateUserPage} from "./CreateUserPage";
import {LoginPage} from "./LoginPage";

export const Dashboard = () => {
  return (
    <>
      <Switch>
        <Route path='/register'>
          <CreateUserPage/>
        </Route>
        <Route path='/login'>
          <LoginPage/>
        </Route>
        <Redirect to='/'/>
      </Switch>
      <div className='start-page-menu'>
        <Link className='start-page-link' to='/register'>Create user</Link>
        <Link className='start-page-link' to='/login'>Log in</Link>
      </div>
    </>
  );
};