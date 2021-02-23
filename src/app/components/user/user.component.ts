import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';
import {CssBlockDefinitionRuleAst} from 'codelyzer/angular/styles/cssAst';
import {Brave} from '../../models/brave';
import {NewUser} from '../../models/new-user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  isLogged = false;
  userBraves: Brave[];
  userTopBraves: Brave[];
  preferredBrave: Brave;
  user: NewUser;
  loading: boolean;

  constructor(  private tokenService: TokenService,
                private userService: UserService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    if ( this.tokenService.getToken() ) {
      this.isLogged = true;
      this.user = new NewUser( this.tokenService.getName(), this.tokenService.getLastname(),
                                this.tokenService.getUserName(), '');
      this.userService.getUserCoins().subscribe(
        data => {
          this.userBraves = data.cryptos;
          this.preferredBrave = this.userBraves.find(
            coin => {
              return coin.id === this.tokenService.getPreferedCryptoId();
            }
          );
        }
      );

      this.userService.getUserTopCoins().subscribe(
        data => this.userTopBraves = data.cryptos
      );
      this.loading = false;
    } else {
      this.isLogged = false;
      this.user = null;
      this.loading = false;
    }
  }

}
