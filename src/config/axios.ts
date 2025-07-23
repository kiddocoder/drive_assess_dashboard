"use client";

import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const accessToken = JSON.parse(localStorage.getItem('accessToken') || "{}");

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
