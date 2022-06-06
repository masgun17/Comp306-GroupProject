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

  export const getGenreOptionsService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getGenreOptions).then(resolve).catch(reject);
  });

  export const getCountryOptionsService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getCountryOptions).then(resolve).catch(reject);
  });

  export const getSearchFilmService = async (data) => 
  new Promise((resolve, reject) => {
    axios.post(API.searchFilm, data).then(resolve).catch(reject);
  })

  export const getCommentsService = async (data) => 
  new Promise((resolve, reject) => {
    axios.post(API.getComments, data).then(resolve).catch(reject);
  })
  





  