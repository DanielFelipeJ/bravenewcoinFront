import { Injectable } from '@angular/core';
import {TokenService} from '../service/token.service';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInterceptorService implements HttpInterceptor{

  constructor( private tokenService: TokenService) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    let intReq = req;
    const token = this.tokenService.getToken();
    if ( token != null ){
      intReq = req.clone( {headers: req.headers.set( 'Authorization', 'Bearer ' + token)});
    }
    return next.handle(intReq);
  }
}

export const interceptorProvider = [ { provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true } ];
