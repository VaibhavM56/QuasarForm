import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import axiosInstance from "src/composables/axiosInstance";

// axios.defaults.baseURL = 'http://20.25.58.133/CSULBCED-DEV';
// axios.interceptors.request.use(config => {

//   const token = sessionStorage.getItem('jwtToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });
export const useAuthStore = defineStore("auth", () => {
  const state = ref({
    userName: "",
    password: "",
  });
  const postUrl = "http://20.25.58.133/CSULBCED-DEV/Login/Authenticate";
  const getUrl =
    "http://20.25.58.133/CSULBCED-DEV/api/Rubrics/GetRubricsTemplateList";
  const jwt = ref(sessionStorage.getItem("jwtToken") || "");
  const isAuthenticated = computed(() => !!jwt.value);
  const message = ref("");

  const authenticate = async () => {
    try {
      const response = await axios.post(postUrl, {
        userName: state.value.userName,
        password: state.value.password,
      });
      console.log(response);
      message.value = response.data.message;
      if (response.data.isSuccess) {
        jwt.value = response.data.jwtToken;
        sessionStorage.setItem("jwtToken", jwt.value);
      }
    } catch (error) {
      console.log("Authentication error");
    }
  };
  const getData = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/Rubrics/GetRubricsTemplateList"
      );
      // console.log(res);
      return res;
    } catch (error) {
      console.error("get data error");
    }
  };

  const logout = () => {
    state.value.userName = "";
    state.value.password = "";
    jwt.value = "";
    sessionStorage.removeItem("jwtToken");
  };

  return { state, authenticate, isAuthenticated, getData, logout, message };
});
