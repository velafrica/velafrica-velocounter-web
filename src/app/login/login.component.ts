import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../core/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from '../core/session.service';

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

  @Output() onLoginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }

  testLogin() {
    this.token = this.sessionService.getToken(this.username, this.password);

    this.loginService.testCredentials(this.token).then(response => {
      if (response) {
        this.onLoginSuccess.emit(true);
      } else {
        this.onLoginSuccess.emit(false);
      }
    });
  }

}
