import axios from "axios";

const API = axios.create({ baseURL: "https://socialspace.fashionclues.shop" });

export const userChats = (id) => API.get(`/chat/${id}`);
