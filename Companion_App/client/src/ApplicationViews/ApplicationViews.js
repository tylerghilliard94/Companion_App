import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";

import Login from "../Login/Login";
import Register from "../Login/Register";
import Home from '../Home/Home'


export default function ApplicationViews(props) {
  const { isLoggedIn, activeUser, userTypeId } = useContext(UserProfileContext);
  const [refresh, setRefresh] = useState(false);

  return (
    <main>

      <Switch>

        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/register">
          <Register />
        </Route>


      </Switch>

    </main >
  );
};
