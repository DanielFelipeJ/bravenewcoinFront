import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  logoBancolombia: string;
  logoColombia: string;
  logoUsa: string;
  translateband: boolean;
  islogged: boolean;
  name: string;
  lastname: string;

  constructor( public translate: TranslateService,
               public tokenService: TokenService) {

    this.logoBancolombia = '../assets/img/logoBancolombia.png';
    this.logoColombia = '../assets/img/logoColombia.png';
    this.logoUsa = '../assets/img/logoUsa.png';
    this.translateband = true;
    this.islogged = false;

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.islogged = true;
    }else {
      this.islogged = false;
    }

    this.name = this.tokenService.getName();
    this.lastname = this.tokenService.getLastname();
  }

  switchLang(lang: string): void {
    this.translate.use(lang);

    if (lang === 'es') {
      this.translateband = true;
    }else {
      this.translateband = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
