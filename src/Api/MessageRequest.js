import axios from "axios";
const API = axios.create({ baseURL: "https://socialspace.fashionclues.shop" });

export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (data) => API.post("/message/", data);