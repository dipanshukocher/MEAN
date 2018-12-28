import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the storage.
    // const authToken = localStorage.getItem('access_token');
    const authToken = this.storage.getToken();
    let authReq = req.clone();
    if (authToken) {
      authReq = req.clone({
        headers: req.headers
          .set('Authorization', authToken)
          .set('Content-Type', 'application/json'),
      });
    }
    // console.log(authReq);
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
