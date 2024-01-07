import axios from "axios";
import { base_url } from "../../utils/base_url";

const register = async (userData) => {
  const response = await axios.post(`${base_url}User/register`, userData);
  return response.data;
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}User/login`, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
};

const loginAsGoogle = async (credential) => {
  const response = await axios.post(
    `${base_url}User/loginWithGoogle`,
    credential
  );
  return response.data;
};

const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${base_url}Cart`, cartData);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
};

const getCustomerCart = async (customerId) => {
  try {
    const response = await axios.get(
      `${base_url}Cart?customer_Id=${customerId}`
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

const removeProductFromCart = async (removeData) => {
  try {
    const response = await axios.delete(
      `${base_url}Cart?customerId=${removeData.customerId}&productId=${removeData.productId}`
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

const updateProductInCart = async (updateData) => {
  try {
    const response = await axios.put(`${base_url}Cart`, updateData);
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

const createPayment = async (paymentData) => {
  const response = await axios.post(`${base_url}Payment`, paymentData);
  return response.data;
};

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${base_url}Order`, orderData);
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

const updateOrder = async (updateData) => {
  try {
    const response = await axios.put(
      `${base_url}Order?id=${updateData.id}&status=${updateData.status}`
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

const getCustomerOrders = async (customerId) => {
  try {
    const response = await axios.get(`${base_url}customerId?id=${customerId}`);
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

const getSingleOrder = async (id) => {
  try {
    const response = await axios.get(`${base_url}id?id=${id}`);
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
// const getOrders = async () => {
//   const response = await axios.get(`${base_url}Order/getAllOrders`, config);
//   return response.data;
// };

const authService = {
  login,
  register,
  loginAsGoogle,
  addToCart,
  getCustomerCart,
  removeProductFromCart,
  updateProductInCart,
  createPayment,
  createOrder,
  updateOrder,
  getCustomerOrders,
  getSingleOrder,
};

export default authService;
