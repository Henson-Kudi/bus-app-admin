import { useNavigate } from "react-router-dom";
import { axios } from "../utils/Utils";
import useAuth from "./useAuth";

export default function useRefresh() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const { data } = await axios.get("/auth/agency/refresh-token", {
        withCredentials: true,
      });
      // update access token of useAuth hook
      setAuth((prev) => ({
        ...prev,
        ...data,
        token: data.token,
      }));
      return data;
    } catch (err) {
      console.log("refresh error");
      console.log(err.response);
      if (err.response.status === 401) {
        navigate("/auth-login");
      }

      console.log(err?.response?.status);
      return null;
    }
  };
  return refresh;
}
