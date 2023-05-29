import { axios, axiosPrivate } from "../utils/Utils";
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import useAuth from "./useAuth";

export default function useAxiosPrivate() {
  const refresh = useRefresh();

  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.token}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseeInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response.status === 403 && !prevReq.sent) {
          prevReq.sent = true;

          const newAcessToken = await refresh();

          prevReq.headers["Authorization"] = `Bearer ${newAcessToken?.token}`;

          return axiosPrivate(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseeInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}
