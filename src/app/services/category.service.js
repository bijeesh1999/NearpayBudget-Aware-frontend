import axios from "axios";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/category`;
axios.defaults.withCredentials = true;


export const createCategory = async (body) => {
  try {
    const newUser = await axios.post(`${API_BASE_URL}/create`, body);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const findAllCategory = async (body) => {
  try {
    const categoties = await axios.post(
      `${API_BASE_URL}/list?month=${body}`,
      body
    );
    return categoties;
  } catch (error) {
    return error;
  }
};

export const updateCategory = async ({ id, body }) => {
  try {
    const category = await axios.put(`${API_BASE_URL}/update/${id}`, body);
    return category;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const category = await axios.put(`${API_BASE_URL}/delete/${id}`, {
      isDeleted: true,
    });
    return category;
  } catch (error) {
    return error;
  }
};

export const findCategory = async ({ id }) => {
  try {
    const category = await axios.get(`${API_BASE_URL}/find/${id}`);
    return category;
  } catch (error) {
    return error;
  }
};

export const findAllUsercategory = async (body) => {
  try {
    const category = await axios.post(
      `${API_BASE_URL}/list??month=${undefined}`,
      body
    );
    return category;
  } catch (error) {
    return error;
  }
};
