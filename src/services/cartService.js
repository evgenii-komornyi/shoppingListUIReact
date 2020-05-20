import http from '../http-common';

class ProductDataService {
  getAll() {
    return http.get(`/allCarts`);
  }

  get(id) {
    return http.get(`/cart/${id}`);
  }

  create(data) {
    return http.post(`/addCart`, data);
  }

  delete(id) {
    return http.delete(`/carts/deleteCart?cartId=` + id);
  }

  addToCart(data){
    return http.put(`/addToCart`, data);
  }

  removeProduct(productId, cartId) {
    return http.delete(`/cart/removeProduct?productId=` + productId + `&cartId=` + cartId);
  }

  clearCart(cartId) {
    return http.delete(`/cart/clearCart?cartId=` + cartId);
  }
}

export default new ProductDataService();