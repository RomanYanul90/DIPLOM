import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {UserAdvertsPage} from "./components/UserAdvertsPage";
import {CreateAdvertPage} from "./components/CreateAdvertPage";
import {AllAdvertsPage} from "./components/AllAdvertsPage";
import {Dashboard} from "./components/Dashboard";
import {AdvertPage} from "./components/AdvertPage";
import {AllUsersPage} from "./components/AllUsersPage";
import {UserPage} from "./components/UserPage";
import {EditAdvertPage} from "./components/EditAdvertPage";
import {RemoveAdvertPage} from "./components/RemoveAdvertPage";
import {EditUserPage} from "./components/EditUserPage";
import {RemoveUserPage} from "./components/RemoveUserPage";

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Switch>
        <Route path='/userPage/:id' exact>
          <UserPage/>
        </Route>
        <Route path='/editUser/:id' exact>
          <EditUserPage/>
        </Route>
        <Route path='/deleteUser/:id' exact>
          <RemoveUserPage/>
        </Route>
        <Route path='/allAdverts' exact>
          <AllAdvertsPage/>
        </Route>
        <Route path='/usersList' exact>
          <AllUsersPage/>
        </Route>
        <Route path='/userAdverts' exact>
          <UserAdvertsPage/>
        </Route>
        <Route path='/advert/:id' exact>
          <AdvertPage/>
        </Route>
        <Route path='/editAdvert/:id' exact>
          <EditAdvertPage/>
        </Route>
        <Route path='/deleteAdvert/:id' exact>
          <RemoveAdvertPage/>
        </Route>
        <Route path='/createAdvert' exact>
          <CreateAdvertPage/>
        </Route>
        <Route path='/userPage' exact>
          <UserPage/>
        </Route>
        <Redirect to='/createAdvert'/>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path='/'>
        <Dashboard/>
      </Route>
      <Redirect to='/'/>
    </Switch>
  );
};