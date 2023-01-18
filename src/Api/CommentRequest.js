import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createComment = (postId, comment) =>{
  console.log("hi")
  console.log(postId, comment);
 return API.post(`/comment/${postId}`, { comment });
}
export const getComments = (postId) => API.get(`/comment/${postId}`);
