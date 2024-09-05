const config = {
  API_URL_LOCAL: "http://localhost:8000",
  API_URL_DEPLOYED: "http://localhost:8000",
};

const useLocal = process.env.REACT_APP_USE_LOCAL === "false";

const apiUrl = useLocal ? config.API_URL_LOCAL : config.API_URL_DEPLOYED;

export default {
  API_URL: apiUrl,
};
