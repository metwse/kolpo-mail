/* global BACKEND_URL */


class Session {
  constructor(token) {
    this.token = token;
  }

  async request(path, body, opt_) {
    const opt = opt_ ?? {};

    const headers = opt.headers ?? {};
    if (this.token)
      headers['Authorization'] = this.token;

    if (body !== null && body !== undefined) {
      headers['Content-Type'] = 'application/json';
      opt.body = JSON.stringify(body);
      opt.method = 'POST';
    }

    opt.headers = headers;

    const response = await fetch(BACKEND_URL + path, opt);

    return [
      await response.json(),
      Math.floor(response.status / 100) == 2,
      response.status
    ];
  }

  async login(email, password) {
    const [res, ok] = await this.request('/login', {
      email, password
    });

    if (ok) {
      this.token = res.token;

      return false;
    } else {
      return res;
    }
  }

  async signup(email, password) {
    const [res, ok] = await this.request('/signup', {
      email, password
    });

    if (ok) {
      this.token = res.token;

      return false;
    } else {
      return res;
    }
  }

  async inbox(before_, limit_) {
    const before = (before_ || -1).toString();
    const limit = (limit_ || 24).toString();

    const [res, ok] = await this.request(
      `/mails/inbox?limit=${limit}&before=${before}`
    );

    return ok ? res : false;
  }

  async checkToken() {
    return await this.request('/me');
  }

  logout() {
    this.token = null;
  }
}


export default Session;
