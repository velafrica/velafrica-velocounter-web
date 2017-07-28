import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

  createToken(username, password): string {
    const token = btoa(username + ':' + password);
    sessionStorage.setItem('token', token);
    return token;
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getAuthorizationHeader(): string {
      return 'Basic ' + this.getToken();
  }

}
