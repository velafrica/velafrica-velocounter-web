import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Organisation } from './organisation';

@Injectable()
export class OrganisationService {

  private apiUrl = 'http://tracking.velafrica.ch/api/organisation/organisations';

  constructor(private http: HttpClient) { }

  getOrganisations(token: string): Promise<Array<Organisation>> {
    return this.http.get(this.apiUrl, { headers: new HttpHeaders().set('Authorization', 'Basic ' + token), })
      .toPromise()
      .then(response => response as Array<Organisation>)
      .catch();
  }

}
