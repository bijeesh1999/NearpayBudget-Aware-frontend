import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/category`;

// Create Category
export const createCategory = async (body) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/create`, body, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// List Categories with month filter
export const findAllCategory = async (month) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/list?month=${month}`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Update Category
export const updateCategory = async ({ id, body }) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/update/${id}`, body, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// Soft Delete Category
export const deleteCategory = async (id) => {
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

// Find Single Category
export const findCategory = async ({ id }) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/find/${id}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// List All User Categories
export const findAllUsercategory = async () => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/list`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    return error;
  }
};
