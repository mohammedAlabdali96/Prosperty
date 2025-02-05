import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://assignment.prosperty-mgmt.dev/v1", // Change this to the actual API
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
