import API from "./api";
import axios from "axios";

export const fetchDBService = async () =>
  new Promise((resolve, reject) => {
    axios.get(API.fetchDB).then(resolve).catch(reject);
  });

export const signupService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.signup, data).then(resolve).catch(reject);
  });

  export const loginService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.login, data).then(resolve).catch(reject);
  });


  