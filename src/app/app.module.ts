import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './core/login.service';
import { CounterService } from './core/counter.service';
import { SessionService } from './core/session.service';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    CounterService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
