import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CounterEntry } from './counterentry';

@Injectable()
export class CounterService {

  private apiUrl = 'http://tracking.velafrica.ch/api/counter/entries/';

  constructor(private http: HttpClient) { }

  /**
   * Get todays counter amount for the selected organisation.
   * @param organisationId
   * @param token
   * @returns {Promise<TResult|TResult2|number>}
   */
  getTodaysCount(organisationId: number, token: string): Promise<number> {
    return this.getTodaysCounterEntry(organisationId, token)
      .then(response => response.amount)
      .catch();
  }

  /**
   * Get todays counter entry for the selected organisation.
   * TODO: check date
   * @param organisationId
   * @param token
   * @returns {Promise<TResult|TResult2|CounterEntry>}
   */
  getTodaysCounterEntry(organisationId: number, token: string): Promise<CounterEntry> {
    return this.http.get(this.apiUrl + '?search=' + organisationId, { headers: new HttpHeaders().set('Authorization', 'Basic ' + token), })
      .toPromise()
      .then(response => {
        const currentDate = new Date();
        if ((<Array<CounterEntry>>response).length > 0) {
          const counter = (<Array<CounterEntry>>response)[0];
          const counterDate = new Date(counter.date);

          console.log('currentDate, counterDate', currentDate, counterDate);

          if (currentDate.getFullYear() === counterDate.getFullYear()
            && currentDate.getMonth() === counterDate.getMonth()
            && currentDate.getDate() === counterDate.getDate()) {
            console.log('currentDate, counterDate are equal');
            return counter;
          }
        }
        // if either no entry was found at all or the latest one is not from today, create a new one.
        return new CounterEntry(currentDate, 0, organisationId);
      })
      .catch();
  }

  incrementCount(organisationId: number, token: string): void {
    console.log('to implement');
  }

  saveCounterEntry(counterEntry: CounterEntry, token: string): Promise<CounterEntry> {
    if (counterEntry.id) {
      console.log('CounterService: saveCounterEntry PUT');
      return this.http.put(this.apiUrl + counterEntry.id, counterEntry, { headers: new HttpHeaders().set('Authorization', 'Basic ' + token), })
        .toPromise()
        .then(response => {
          console.log('saveCountryEntry', counterEntry, response);
          return response as CounterEntry;
        })
        .catch();
    } else {
      console.log('CounterService: saveCounterEntry POST');
      return this.http.post(this.apiUrl, counterEntry, { headers: new HttpHeaders().set('Authorization', 'Basic ' + token), })
        .toPromise()
        .then(response => {
          console.log('saveCountryEntry', counterEntry, response);
          return response as CounterEntry;
        })
        .catch();
    }
  }

}
