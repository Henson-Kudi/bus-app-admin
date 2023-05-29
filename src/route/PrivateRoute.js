import React, { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import Layout from "../layout/Index";
import { Spinner } from "reactstrap";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefresh();

  const location = useLocation();

  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefresh() : setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spinner size={"sm"}>Loading...</Spinner>
      </div>
    );
  }

  return auth ? (
    <Layout></Layout>
  ) : (
    navigate(`/auth-login`, {
      replace: true,
      state: {
        from: {
          pathname: location.pathname,
        },
      },
    })
  );
};

export default PrivateRoute;
