import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth-service.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  lang: string;
  headers: any;
  constructor(private _authService: AuthService) {
    this.lang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '';
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        'Accept-Language': localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') || '',
      },
    });
  }
}
