import * as services from "./services";
export const fetchDBAction = async () => {
  try {
    const result = await services.fetchDBService();
    return result.data;
  } catch (error) {
    console.log("Error on fetchDBAction");
    console.log(error);
  }
};

export const signupAction = async (data) => {
  try {
    const result = await services.signupService(data);
    return result.data;
  } catch (error) {
    console.log("Error on signupAction");
    console.log(error);
  }
};

export const loginAction = async (data) => {
    try {
      const result = await services.loginService(data);
      return result.data;
    } catch (error) {
      console.log("Error on loginAction");
      console.log(error);
    }
  };

  export const getGenreOptionsAction = async () => {
    try {
      const result = await services.getGenreOptionsService();
      return result.data;
    } catch (error) {
      console.log("Error on getGenreOptionsAction");
      console.log(error);
    }
  };

  export const getCountryOptionsAction = async () => {
    try {
      const result = await services.getCountryOptionsService();
      return result.data;
    } catch (error) {
      console.log("Error on getCountryOptionsService");
      console.log(error);
    }
  };

  export const getSearchFilmAction = async (data) =>{
    try {
      const result = await services.getSearchFilmService(data);
      return result.data;
    } catch (error) {
      console.log("Error on getSearchFilmAction");
      console.log(error);
    }
  }

