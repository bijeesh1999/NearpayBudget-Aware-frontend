import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/budget`;

// Create
export const createBudget = async (body) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/create`, body, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// List
export const findAllBudget = async (body) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/list?month=${body.date}`,
      body,
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Update
export const updateBudget = async ({ id, limitCents }) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { limitCents },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Find One
export const findOnebudget = async ({ id }) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/find/${id}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// Delete
export const deleteBudget = async ({ id }) => {
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
