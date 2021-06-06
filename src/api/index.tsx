import axios from "axios";

const instance = axios.create({
  baseURL: "https://60bb45a542e1d000176207c0.mockapi.io/",
});

export default instance;
