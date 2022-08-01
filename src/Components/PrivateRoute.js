//https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Amplify, { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  Auth.currentAuthenticatedUser()
    .then((sess) => {
      console.log("logged in");
      setLoggedIn(true);
    })
    .catch(() => {
      console.log("not logged in");
      setLoggedIn(false);
    });

  return loggedIn ? <Navigate to="/" /> : <Navigate to="/signUp" />;
};

export default PrivateRoute;
