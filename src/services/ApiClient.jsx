import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  timeout: 5000, // Timeout set to 5 seconds (5000 ms)
});

// apiClient.interceptors.request.use(
//   (req) => {

//   }, (err) => {
//     console.log(err);
//     return Promise.reject(err);
//   }
// )

apiClient.interceptors.response.use(
  (res) => {

    return res;
  },
  (err) => {
    console.log(err);
    if (err.code == "ERR_NETWORK") {
      toast.error("Something went wrong. Please check your internet connection.")
    }
    return Promise.reject(err);
  }
)
export default apiClient;
