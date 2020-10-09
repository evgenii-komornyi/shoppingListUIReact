import http from './http-common';

class UserDataService {
    create(data) {
        return http.post(`/api/user/createUser`, data);
    }
}

export default new UserDataService();