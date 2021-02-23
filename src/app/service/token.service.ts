import { Injectable } from '@angular/core';
import {NewUser} from '../models/new-user';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USER = 'AuthUser';
const ROLES_KEY = 'AuthRoles';
const ID_KEY = 'AuthId';
const NAME_KEY = 'AuthName';
const LASTNAME_KEY = 'AuthLastname';
const IDPREFERED_KEY = 'IdPrefered'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach( authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }

  public setUser(user: string): void{
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(USER, user);
  }

  public setPreferedCryptoId(idPrefered: number): void {
    window.sessionStorage.removeItem(IDPREFERED_KEY);
    window.sessionStorage.setItem(IDPREFERED_KEY, idPrefered.toString());
  }

  public getPreferedCryptoId(): number {
    return Number(sessionStorage.getItem( IDPREFERED_KEY ));
  }

  public getUser(): NewUser {
    return JSON.parse(window.sessionStorage.getItem(USER));
  }

  public setRoles(roles: string[]): void{
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }

  public getRoles(): string[]{
    this.roles = [];
    if (sessionStorage.getItem(ROLES_KEY)){
      JSON.parse(sessionStorage.getItem(ROLES_KEY)).forEach(role => {
        this.roles.push(role.role);
      });
    }
    return this.roles;
  }

  public setId( id: number ): void {
    window.sessionStorage.removeItem( ID_KEY );
    window.sessionStorage.setItem( ID_KEY, id.toString() );
  }

  public getId(): number {
    return Number( window.sessionStorage.getItem( ID_KEY ) );
  }

  public setName( name: string ): void {
    window.sessionStorage.removeItem( NAME_KEY );
    window.sessionStorage.setItem( NAME_KEY, name );
  }

  public getName(): string {
    return window.sessionStorage.getItem( NAME_KEY );
  }

  public setLastname( lastname: string ): void {
    window.sessionStorage.removeItem( LASTNAME_KEY );
    window.sessionStorage.setItem( LASTNAME_KEY, lastname );
  }

  public getLastname(): string {
    return window.sessionStorage.getItem( LASTNAME_KEY );
  }
}
