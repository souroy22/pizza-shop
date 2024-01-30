import axios from "axios";

const AXIOS = axios.create({
  baseURL: "https://pizza-shop-22b2d-default-rtdb.firebaseio.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AXIOS;
