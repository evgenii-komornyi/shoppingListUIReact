import http from './http-common';

class ProductDataService {
    getAll() {
        return http.get(`/api/product/products`);
    }

    get(id) {
        return http.get(`/api/product/${id}`);
    }

    getCategories() {
        return http.get(`/api/category/categories`);
    }

    create(data) {
        return http.post(`/api/product/create`, data);
    }

    update(id, data) {
        return http.put(`/api/product/${id}`, data);
    }

    delete(id) {
        return http.delete(`/api/product/${id}`);
    }

    upload(fileName, fileCategory, data) {
        return http.post(`/api/upload/create?fileName=` + fileName + `&fileCategory=` + fileCategory, data);
    }

    getFiles() {
        return http.get(`/api/upload/files`);
    }
}

export default new ProductDataService();