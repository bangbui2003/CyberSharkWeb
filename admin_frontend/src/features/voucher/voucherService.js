import axios from "axios";
import { base_url } from "../../utils/base_url";

const getVouchers = async () => {
  const response = await axios.get(`${base_url}Category/`);
  return response.data;
};

const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${base_url}Category/`, categoryData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const getCategory = async (id) => {
  try {
    const response = await axios.get(`${base_url}Category/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const updateCategory = async (category) => {
  try {
    const response = await axios.put(`${base_url}Category/?id=${category.id}`, {
      name: category.categoryData.name,
      category_Image: category.categoryData.category_Image,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${base_url}Category?categoryId=${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};
const categoryService = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
