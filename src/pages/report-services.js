import axios from "axios";
const BOOKS_API = "api/v1/books";

class ReportsService {
  constructor() {
    // ApiService.setHeader();
    // ApiService.adminScope();
  }

  all() {
    return axios.get(BOOKS_API);
  }

  saveData(payloads) {
    console.log("data", payloads);
    return axios.post(BOOKS_API, payloads);
  }

  updateData(payloads) {
    console.log("data", payloads);
    return axios.patch(BOOKS_API + "/" + payloads.id, payloads);
  }

  deleteData = async (payload) => {
    return axios.delete(BOOKS_API + "/" + payload);
  };
}

export default new ReportsService();
