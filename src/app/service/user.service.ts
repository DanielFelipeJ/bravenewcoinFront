import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {Observable} from 'rxjs';
import {Brave} from '../models/brave';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPoint = 'http://localhost:8080/apibrave/users/';

  constructor( private http: HttpClient,
               private router: Router,
               private tokenService: TokenService)
  { }

  getUserCoins(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + this.tokenService.getId().toString() + '/cryptos');
  }

  getUserTopCoins(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + this.tokenService.getId().toString() + '/top3');
  }

  public setFavoriteCoin(brave: Brave): Observable<any>{
    return this.http.put<any>(this.urlEndPoint + this.tokenService.getId().toString() + '/setfavoritecrypto', brave);
  }

  public addCoin(brave: Brave): Observable<any>{
    return this.http.put<any>(this.urlEndPoint + this.tokenService.getId().toString() + '/addcrypto', brave);
  }

}
