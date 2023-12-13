import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://ecommerce-api-3946fddfdbf1.herokuapp.com/",
});

export default baseURL;
