import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../core/auth/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../core/auth/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public token: string;
  public loginSuccess = false;
  public loginError: boolean;

  @Output() onLoginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }

  testLogin() {
    this.token = this.sessionService.createToken(this.username, this.password);

    this.loginError = false;

    this.loginService.testCredentials(this.token)
      .then(response => {
        if (response) {
          this.onLoginSuccess.emit(true);
          console.log('Login success');
        } else {
          this.onLoginSuccess.emit(false);
        }
      })
      .catch(err => {
        this.loginError = true;
        console.log('Error while trying to log in.');
      });
  }

}
