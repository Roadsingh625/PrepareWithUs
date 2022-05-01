import axios from "axios";
export const apiCall = async (method, endPoint, params) => {
  const base_url="http://127.0.0.1:5000"
  const token = await localStorage.getItem("token");
  axios.defaults.headers.common['token'] = JSON.parse(token);
  if (method === "POST") {
    try {
      const res=axios.post(base_url+endPoint,params)
      return res
    } catch (error) {
      return error.response
    }
      
  } else {
    try {
      const res=axios.get(base_url+endPoint,params)
      return res
    } catch (error) {
      return error.response
    }
  }
};
