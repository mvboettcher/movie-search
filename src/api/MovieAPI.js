import axios from "axios";

const baseUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

export const MovieAPI = {
  getSeachResults: async function (searchString) {
    const response = await axios.request({
      url: `${baseUrl}&s=${searchString}`,
      method: "GET",
    });
    return response.data;
  },
};
