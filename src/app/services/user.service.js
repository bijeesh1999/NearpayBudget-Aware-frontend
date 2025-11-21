import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;
axios.defaults.withCredentials = true;

console.log({ url: API_BASE_URL });

export const createUser = async (body) => {
  console.log({ body });
  try {
    const newUser = await axios.post(`${API_BASE_URL}/signup`, body);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  console.log({ body });
  try {
    const user = await axios.post(`${API_BASE_URL}/login`, body);
    return user;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async ({ id, body }) => {
  console.log({ id, body });
  try {
    const newUser = await axios.put(`${API_BASE_URL}/logout`);
    return newUser;
  } catch (error) {
    return error;
  }
};
