import axios from "axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

const axiosInstance = axios.create({
  baseURL: "http://20.25.58.133/CSULBCED-DEV",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwtToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // $q.loading.show();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // $q.loading.hide();
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    // $q.loading.hide();
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import { useQuasar } from "quasar";

// const $q = useQuasar();

// const axiosInstance = axios.create({
//   baseURL: "http://20.25.58.133/CSULBCED-DEV",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (window.$q && typeof window.$q.loading === "function") {
//       window.$q.loading.show();
//     }

//     const token = sessionStorage.getItem("jwtToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     if (window.$q && typeof window.$q.loading === "function") {
//       window.$q.loading.hide();
//     }
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (window.$q && typeof window.$q.loading === "function") {
//       window.$q.loading.hide();
//     }
//     return response;
//   },
//   (error) => {
//     if (window.$q && typeof window.$q.loading === "function") {
//       window.$q.loading.hide();
//     }

//     if (error.response && error.response.status === 401) {
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
