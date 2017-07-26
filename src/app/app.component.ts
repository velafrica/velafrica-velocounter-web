import { Component } from '@angular/core';
import { CounterService } from './core/counter.service';
import { LoginService } from './core/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private apiUrl = 'http://tracking.velafrica.ch/api/counter/entries';

  public dailyCount: number;

  constructor(
    private counterService: CounterService,
    private loginService: LoginService
  ) {}

  public userLoggedIn: boolean;

  onLoginSuccess(value: boolean) {
    console.log(value);
    this.userLoggedIn = value;

    // get counter
    this.dailyCount = this.counterService.getTodaysCount();
  }

  onCounterClick() {
    console.log('counter++');
    this.dailyCount++;
  }



}
