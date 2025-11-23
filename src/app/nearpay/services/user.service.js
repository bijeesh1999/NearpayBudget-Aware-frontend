import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;
axios.defaults.withCredentials = true;


export const createUser = async (body) => {
  try {
    const newUser = await axios.post(`${API_BASE_URL}/signup`, body);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  try {
    const user = await axios.post(`${API_BASE_URL}/login`, body);
    return user;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const newUser = await axios.post(`${API_BASE_URL}/logout`);
    return newUser;
  } catch (error) {
    return error;
  }
};
