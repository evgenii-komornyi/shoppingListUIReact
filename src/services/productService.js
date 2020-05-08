import http from '../http-common';

class ProductDataService {
  getAll() {
    return http.get("/allProducts");
  }

  get(id) {
    return http.get(`/product/${id}`);
  }

  create(data) {
    return http.post("/create", data);
  }

  update(id, data) {
    return http.put(`/product/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product/${id}`);
  }
}

export default new ProductDataService();