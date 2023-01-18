import axios from "axios";
const API = axios.create({ baseURL: "https://socialspace.fashionclues.shop" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);

export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });

  export const deletePost = (postId,data) => API.post(`/post/deletePost/${postId}`,data);