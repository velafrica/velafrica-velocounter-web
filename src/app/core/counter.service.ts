import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CounterService {

  private apiUrl = 'http://tracking.velafrica.ch/api/counter/entries';

  constructor(private http: HttpClient) { }

  getTodaysCount(): number {
    this.http.get(this.apiUrl).subscribe(

    );
    return 42;
  }

}
