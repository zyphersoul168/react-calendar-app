import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "../components/auth/LoginPage";
import { SignupPage } from "../components/auth/SignupPage";

export const AuthRouter = () => {
  return (
    <div>
      <div className="bg-gray-200 flex items-center justify-center margin-0 h-screen">
        {/* <div className="text-center"> */}
          <Switch>
            <Route exact path="/auth/login" component={LoginPage} />
            <Route exact path="/auth/signup" component={SignupPage} />
            <Redirect to="/auth/login" />
          </Switch>
        {/* </div> */}
      </div>
    </div>
  );
};
