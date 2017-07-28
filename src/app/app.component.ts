import { Component, OnInit } from '@angular/core';
import { CounterService } from './core/counter/counter.service';
import { LoginService } from './core/auth/login.service';
import { OrganisationService } from './core/organisation/organisation.service';
import { SessionService } from './core/auth/session.service';
import { Organisation } from './core/organisation/organisation';
import { CounterEntry } from './core/counter/counterentry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  private apiUrl = 'http://tracking.velafrica.ch/api/counter/entries';

  public counterEntry: CounterEntry;
  public serverCounterEntry: CounterEntry;
  public organisations: Array<Organisation>;
  public selectedOrganisation: Organisation;
  public showOrganisationList: boolean;
  private token: string;
  public userLoggedIn: boolean;

  constructor(
    private counterService: CounterService,
    private loginService: LoginService,
    private organisationService: OrganisationService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    // check for existing session
    if (this.sessionService.getToken()) {
      this.token = this.sessionService.getToken();
      this.userLoggedIn = true;
      this.getOrganisations();
    }
  }

  getOrganisations() {
    // get organisations
    this.organisationService.getOrganisations(this.token)
      .then(
        response => {
          this.organisations = response;
          console.log(response);

          if (this.organisations.length === 1) {
            this.selectedOrganisation = this.organisations.pop();
            this.getTodaysCount();
          } else {
            this.showOrganisationList = true;
          }

        }
      )
      .catch(err => console.log('error fetching organisations', err));
  }

  onLoginSuccess(value: boolean) {
    console.log(value);
    this.userLoggedIn = value;

    this.token = this.sessionService.getToken();

    this.getOrganisations();

    // get counter
    // this.dailyCount = this.counterService.getTodaysCount(selectedOrganisation.id, token);
  }

  onCounterClick() {
    // TODO: push to Django
    console.log('counter++');
    this.counterEntry.amount++;
  }

  selectOrganisation(org: Organisation) {
    this.selectedOrganisation = org;
    this.getTodaysCount();
  }

  getTodaysCount() {
    this.counterService.getTodaysCounterEntry(this.selectedOrganisation.id, this.token)
              .then(resp => {
                this.counterEntry = resp;
                console.log('daily count', resp);
              })
              .catch(err => console.log('error fetching daily count', err));
  }

  saveCounterEntry() {
    // TODO: should always make a get first to get updates from server side
    this.counterService.saveCounterEntry(this.counterEntry, this.token)
      .then(response => {
        console.log('Counter Entry saved', this.counterEntry, response);
        this.counterEntry = response;
      })
      .catch(err => console.log('Error saving counter entry', this.counterEntry, err));
  }

  counterInSyncWithServer(): boolean {
    // TODO: implement
    return false;
  }


}
