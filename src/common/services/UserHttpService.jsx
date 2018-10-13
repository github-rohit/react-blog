import HttpService from './HttpService';

class UserHttpService extends HttpService {
  async logout() {
    return await this.post('', `${this.urlPrefix}/logout`);
  }

  async login(data) {
    return await this.post(data, `${this.urlPrefix}/login`);
  }

  async password(data) {
    return await this.post(data, `${this.urlPrefix}/password`);
  }
}

export default new UserHttpService('user');
