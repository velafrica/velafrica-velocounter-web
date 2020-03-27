import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginService {

  private apiUrl = 'http://tracking.velafrica.ch/api/';

  constructor(private http: HttpClient) { }

  testCredentials(token: string): Promise<boolean> {
    // Make the HTTP request:
    return this.http.get(this.apiUrl, { headers: new HttpHeaders().set('Authorization', 'Basic ' + token), })
      .toPromise()
      .then(response => true)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
