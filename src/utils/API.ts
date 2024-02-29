import axios from "axios";

const unsplashAPI = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID BiVPg1o2YHWK619QSZpYL0Cr7TzaB2eLW7HuFyByIeg",
  },
});

export default unsplashAPI;
