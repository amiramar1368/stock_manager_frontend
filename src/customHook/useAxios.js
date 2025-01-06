import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const useAxios = () => {
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 6000,
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.accessToken;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      const data = response.data;
      if (data.success) {
        if (response.config?.method !== "get") {
          toast.success(data.message);
        }
        return data;
      } else {
        toast.error(data.message);
      }
    },
    async (error) => {
      const previousRequest = error.config;
      console.log({_retry:previousRequest._retry});
      if (error.response?.status === 401 && !previousRequest._retry) {
        previousRequest._retry = true;

        try {
          // Use the refresh token to get a new access token
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.get(`http://localhost:3000/users/refresh-token?refreshToken=${refreshToken}`);
          const newAccessToken = response.data.body.accessToken;
          const newRefreshToken = response.data.body.refreshToken;
          localStorage.accessToken = newAccessToken;
          localStorage.refreshToken = newRefreshToken;

          // Update the Authorization header with the new access token
          previousRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the previous request with the new access token
          return axiosInstance(previousRequest);
        } catch (refreshError) {
          toast.error("Error in refreshing access token");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return Promise.reject(refreshError);
        }
      } else {
        toast.error(error.response?.data.message);
        navigate("/login")
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
