import axios from "axios";

class ReportsService {
  constructor() {
    // ApiService.setHeader();
    // ApiService.adminScope();
  }

  all() {
    return axios.get("api/v1/books");
  }

  getById(id) {
    return axios.get(`site/banners/${id}`);
  }
}

export default new ReportsService();
