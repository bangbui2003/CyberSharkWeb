import axios from "axios";
import { base_url } from "../../utils/base_url";

const getOrders = async () => {
  try {
    const response = await axios.get(`${base_url}Order`);
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
  getOrders,
  updateOrder,
  getSingleOrder,
};

export default authService;
