import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

  getToken(username, password) {
    return btoa(username + ':' + password);
  }

}
