import axios from "axios";
import { base_url } from "../../utils/base_url";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}Enquiry/getAllEnquiries`);
  return response.data;
};

const enquiryService = {
  getEnquiries,
};

export default enquiryService;
