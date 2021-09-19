import React, { Suspense, useEffect, useState } from "react";

import "./App.css";
import LoginButton from "./components/LoginButton";
import * as RouteComponents from "./util/RouteComponents";
import { Route, Switch } from "react-router";
import { useAuth0 } from "./util/Auth";
// import { Typography } from "@material-ui/core";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { useQuery } from "@apollo/client";
import { IS_AUTHENTICATED } from "./api/Graphql/Queries";
import { useDispatch } from "react-redux";
import { getPermissions } from "./store/actions/user";
import {
  getPermissionRoutes,
  getPermissionSubRoutes,
} from "./util/getPermissionRoutes";
import { setIsLoading } from "./store/actions/loading";
import LoadingSpinner from "./components/LoadingSpinner";

// import { getPermissions } from "./store/actions/user";
function App() {
  const { isAuthenticated, authLoading } = useAuth0();

  const { data, loading } = useQuery(IS_AUTHENTICATED);
  const dispatch = useDispatch();
  const [permissionRoutes, setPermissionRoutes] =
    useState<Array<"Blog" | "Books" | "Character">>();
  const [subPermissionRoutes, setSubPermissionRoutes] = useState<{
    Books?: Array<"add" | "update" | "delete">;
    Blog?: Array<"add" | "update" | "delete">;
    Character?: Array<"add" | "update" | "delete">;
  }>();

  useEffect(() => {
    const setPermissions = async () => {
      if (data && data.isAuthenticated) {
        if (loading || authLoading || !data.isAuthenticated) {
          dispatch(setIsLoading(true));
        } else {
          let permissions = data.isAuthenticated.permissions;
          // console.log(data.isAuthenticated.permissions);
          dispatch(getPermissions({ permissions }));
          setPermissionRoutes(getPermissionRoutes(permissions));
          setSubPermissionRoutes(getPermissionSubRoutes(permissions));
          dispatch(setIsLoading(false));
        }
      }
    };

    setPermissions();

    return () => {};
    // eslint-disable-next-line
  }, [authLoading, loading]);
  console.log(subPermissionRoutes);

  return (
    <div className="App">
      {!isAuthenticated ? (
        !authLoading && <LoginButton />
      ) : (
        <React.Fragment>
          <Navbar />
          <Suspense fallback={<LoadingSpinner force={true} />}>
            <Switch>
              {permissionRoutes &&
                permissionRoutes.map((r) => {
                  return subPermissionRoutes![r]!.map((permR) => {
                    if (permR !== "delete") {
                      return (
                        <Route
                          key={permR + r}
                          path={
                            "/" + r.toLowerCase() + "/" + permR.toLowerCase()
                          }
                          component={
                            //@ts-ignore
                            RouteComponents[
                              permR.charAt(0).toUpperCase() + permR.slice(1) + r
                            ]
                          }
                        />
                      );
                    }
                  });
                })}
              {permissionRoutes &&
                permissionRoutes.map((route) => {
                  return (
                    <Route
                      key={route}
                      path={"/" + route.toLowerCase()}
                      component={RouteComponents[route]}
                    />
                  );
                })}
              <Route path="/" component={Dashboard} />
            </Switch>
          </Suspense>
          <LoadingSpinner />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
