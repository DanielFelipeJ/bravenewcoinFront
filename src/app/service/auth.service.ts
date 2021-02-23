import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewUser} from '../models/new-user';
import {Observable} from 'rxjs';
import {LoginUser} from '../models/login-user';
import {JwtDTO} from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUser);
  }

  public newUser(newUser: NewUser): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'newUser', newUser);
  }
}
