import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NotFound from "../../components/NotFound";
import Profile from "./Profile";
import Setting from "./Setting";
import "./scss/_main.scss";

Index.propTypes = {
  isLogged: PropTypes.func,
};

Index.defaultProps = {
  isLogged: null,
};

function Index(props) {
  const match = useRouteMatch();

  const actionLogin = () => {
    props.isLogged("login");
  };

  return (
    <div className="sign-content">
      <Switch>
        <Route path={`${match.url}/sign-in`}>
          <Login isLogged={actionLogin} />
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
