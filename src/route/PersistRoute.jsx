import React, { useEffect, useState } from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Index";

export default function PersistRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefresh();

  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`auth: ${auth?.token}`);

    return () => {};
  }, [isLoading]);

  return isLoading ? <>loading</> : <PrivateRoute exact={true} element={<Layout />} />;
}
