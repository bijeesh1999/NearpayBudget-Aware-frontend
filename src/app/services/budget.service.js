import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/budget`;
axios.defaults.withCredentials = true;


export const createBudget = async (body) => {
  try {
    const newUser = await axios.post(`${API_BASE_URL}/create`, body);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const findAllBudget = async (body) => {
  try {
    const newUser = await axios.post(
      `${API_BASE_URL}/list??month=${body.date}`,
      body
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

export const updateBudget = async ({ id, limitCents }) => {
  try {
    const newUser = await axios.put(`${API_BASE_URL}/update/${id}`, {
      limitCents,
    });
    return newUser;
  } catch (error) {
    return error;
  }
};

export const findOnebudget = async ({ id }) => {
  try {
    const budget = await axios.get(`${API_BASE_URL}/find/${id}`);
    return budget;
  } catch (error) {
    return error;
  }
};

export const deleteBudget = async ({ id }) => {
  try {
    const newUser = await axios.put(`${API_BASE_URL}/delete/${id}`, {
      isDeleted: true,
    });
    return newUser;
  } catch (error) {
    return error;
  }
};

