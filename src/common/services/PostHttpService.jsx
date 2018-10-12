import HttpService from './HttpService';

class PostService extends HttpService {
  async authGet(createdBy, query = '') {
    return await this.post('', `${this.urlPrefix}/${createdBy}?${query}`);
  }
}

export default new PostService('api/posts');
