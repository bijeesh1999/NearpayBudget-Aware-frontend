import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/expense`;

// Create Expense
export const createExpenses = async (body) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/create`, body, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// List Expenses
export const findAllExpenses = async ({ date }) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/list?month=${date}`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Update Expense
export const updateExpenses = async ({ id, body }) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/update/${id}`, body, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// Delete Expense (Soft Delete)
export const deleteExpenses = async (id) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/delete/${id}`,
      { isDeleted: true },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};
