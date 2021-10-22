import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Redirect,
  HashRouter as Router,
  Switch,
} from "react-router-dom";

import { startChecking } from "../actions/auth";
import { CalendarPage } from "../components/calendar/CalendarPage";
import { LoadingPage } from "../components/ui/LoadingPage";
import { AuthRouter } from "./AuthRouter";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <LoadingPage />;
  }

  return (
    <Router >
      <div>
        <Switch>
          <PublicRouter
            isAuthenticated={!!uid}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRouter
            isAuthenticated={!!uid}
            exact
            path="/"
            component={CalendarPage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
