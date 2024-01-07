import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAddresses = async (customerId) => {
  try {
    const response = await axios.get(`${base_url}Addresss/${customerId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
};

const addAddress = async (addressData) => {
  try {
    const response = await axios.post(`${base_url}Addresss`, addressData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
};

const updateAddress = async (address_id, addressData) => {
  try {
    const response = await axios.put(
      `${base_url}Addresss?id=${address_id}`,
      addressData
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
};

const deleteAddress = async (address_id) => {
  try {
    const response = await axios.delete(
      `${base_url}Addresss?AddressId=${address_id}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
};

const addressService = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};

export default addressService;
