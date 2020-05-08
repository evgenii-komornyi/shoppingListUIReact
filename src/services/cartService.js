import http from '../http-common';

class ProductDataService {
  getAll() {
    return http.get("/allCarts");
  }

  get(id) {
    return http.get(`/cart/${id}`);
  }

  create(data) {
    return http.post("/addCart", data);
  }

  addToCart(id, data){
    return http.put(`/cart/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cart/${id}`);
  }
}

export default new ProductDataService();