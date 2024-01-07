import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCustomers = async () => {
  const response = await axios.get(`${base_url}Customer/getAllCustomers`);
  return response.data;
};

const customerService = {
  getCustomers,
};

export default customerService;
