import jwtDecode from 'jwt-decode';

class AuthService {
  tokenKey = 'x-token';

  get user() {
    try {
      const jwt = this.token;
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  }

  get token() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  set token(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() {}
}

export default new AuthService();
