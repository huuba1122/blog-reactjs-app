import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NotFound from "../../components/NotFound";
import Profile from "./Profile";
import Setting from "./Setting";
import "./scss/_main.scss";

function Index() {
  const match = useRouteMatch();
  return (
    <div className="sign-content">
        <Switch>
          <Route path={`${match.url}/sign-in`}>
            <Login />
          </Route>
          <Route path={`${match.url}/sign-up`}>
            <Register />
          </Route>
          <Route path={`${match.url}/profile/:userId`}>
            <Profile />
          </Route>
          <Route path={`${match.url}/setting`}>
            <Setting />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </div>
  );
}

export default Index;
