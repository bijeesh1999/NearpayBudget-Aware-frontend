
import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/expense`;

export const createExpenses = async (body) => {
  try {
    const newUser = await axios.post(`${API_BASE_URL}/create`, body);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const findAllExpenses = async (body) => {
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

export const updateExpenses = async ({ id, body }) => {
  try {
    const newUser = await axios.put(`${API_BASE_URL}/update/${id}`, body);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const deleteExpenses = async (id) => {
  try {
    const newUser = await axios.put(`${API_BASE_URL}/delete/${id}`, {
      isDeleted: false,
    });
    return newUser;
  } catch (error) {
    return error;
  }
};
