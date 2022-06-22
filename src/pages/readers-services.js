import axios from "axios";
const BOOKS_API = "api/v1/readers";

class ReadersService {
  constructor() {
    // ApiService.setHeader();
    // ApiService.adminScope();
  }

  all() {
    return axios.get(BOOKS_API);
  }

  saveData(payloads) {
    return axios.post(BOOKS_API, payloads);
  }

  deleteData = async (payload) => {
    return axios.delete(BOOKS_API + "/" + payload);
  };
}

export default new ReadersService();
