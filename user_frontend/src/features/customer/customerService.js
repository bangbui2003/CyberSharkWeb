import axios from "axios";
import { base_url } from "../../utils/base_url";

const register = async (userData) => {
  const response = await axios.post(`${base_url}User/register`, userData);
  return response.data;
};

const getCustomer = async (id) => {
  try {
    const response = await axios.post(`${base_url}`);
  } catch (error) {}
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}User/login`, userData);
    if (response.data) {
      localStorage.setItem("jwtToken", JSON.stringify(response.data));
    }
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

// const getOrders = async () => {
//   const response = await axios.get(`${base_url}Order/getAllOrders`, config);
//   return response.data;
// };

const authService = {
  login,
  register,
  loginAsGoogle,
};

export default authService;
