import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {Observable} from 'rxjs';
import {Brave} from '../models/brave';

@Injectable({
  providedIn: 'root'
})
export class BravesService {

  private urlEndPoint = 'http://localhost:8080/bnc/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient,
               private router: Router,
               private tokenservice: TokenService
  ) { }

  getCoins(): Observable<Brave[]>{
    return this.http.get<Brave[]>(this.urlEndPoint + 'crypto');
  }
}
