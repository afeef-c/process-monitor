import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProcesses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/processes/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
};

export const terminateProcess = async (pid) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/terminate/`, { pid });
    return response.data;
  } catch (error) {
    console.error("Error terminating process:", error);
    throw error;
  }
};
