import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { SessionService } from './auth/session.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('AuthInterceptor:', req, next);

    // Get the auth header from the service.
    const authHeader = this.sessionService.getAuthorizationHeader();

    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
