import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "./Atoms";

const PrivateRoute = ({ element, path }) => {
  const isLoggedIn = useRecoilValue(userState).isLoggedIn;

  return (
    <Fragment>
      {isLoggedIn ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to="/Login" replace />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
