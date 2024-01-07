import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBrands = async () => {
  const response = await axios.get(`${base_url}Brand/`);
  return response.data;
};

const getBrand = async (id) => {
  try {
    const response = await axios.get(`${base_url}Brand/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const createBrand = async (brandData) => {
  try {
    const response = await axios.post(`${base_url}Brand/`, brandData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const updateBrand = async (brand) => {
  try {
    const response = await axios.put(`${base_url}Brand/?id=${brand.id}`, {
      name: brand.brandData.name,
      brand_Image: brand.brandData.brand_Image,
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

const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${base_url}Brand?brandId=${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

const brandService = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
