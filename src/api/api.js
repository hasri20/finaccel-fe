import axios from "axios";
import Cookies from "js-cookie";

const axiosApiInstance = axios.create();

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    const response = await axios.put("http://localhost:5000/authentications", {
      refreshToken,
    });

    Cookies.set("accessToken", response.data.data.accessToken);
    return response.data.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("accessToken");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();

      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
