import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getProducts = async () => {
  const response = await axios.get(`${base_url}Product`);
  return response.data;
};

const createProduct = async (product) => {
  try {
    const response = await axios.post(`${base_url}Product`, product);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const getProduct = async (id) => {
  try {
    const response = await axios.get(`${base_url}Product/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${base_url}Product/?id=${product.id}`, {
      name: product.productData.name,
      cost_Price: product.productData.cost_Price,
      sale_Price: product.productData.sale_Price,
      description: product.productData.description,
      quantity: product.productData.quantity,
      product_Images: product.productData.product_Images,
      category_Id: product.productData.category_Id,
      brand_Id: product.productData.brand_Id,
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

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${base_url}Product/?productId=${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
