class HttpService {
  constructor(url) {
    this.urlPrefix = `http://localhost:3000/api/${url}`;
  }
  async get(query = '') {
    try {
      const response = await fetch(`${this.urlPrefix}?${query}`, {
        mode: 'cors'
      });
      if (response.clone().status === 404) {
        throw new Error(404);
      }
      return await response.json();
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${this.urlPrefix}/${id}`, {
        mode: 'cors'
      });
      return await response.json();
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  async post(data, url = this.urlPrefix) {
    try {
      const resObj = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
      if (data) {
        resObj.body = JSON.stringify(data);
      }
      const response = await fetch(`${url}`, resObj);
      return await response.json();
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  async patch(id, data) {
    try {
      const response = await fetch(`${this.urlPrefix}/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`${this.urlPrefix}/${id}`, {
        mode: 'cors',
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
}

export default HttpService;
