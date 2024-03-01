import axios from "axios";
const URL = "https://api.unsplash.com/";
const ACCESS_KEY = "BiVPg1o2YHWK619QSZpYL0Cr7TzaB2eLW7HuFyByIeg";

const unsplashAPI = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export default unsplashAPI;
