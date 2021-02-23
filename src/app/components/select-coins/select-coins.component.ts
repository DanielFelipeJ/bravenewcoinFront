import { Component, OnInit } from '@angular/core';
import {Brave} from '../../models/brave';
import {NewUser} from '../../models/new-user';
import {TokenService} from '../../service/token.service';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-coins',
  templateUrl: './select-coins.component.html',
  styleUrls: ['./select-coins.component.sass']
})
export class SelectCoinsComponent implements OnInit {

  isLogged = false;
  userBraves: Brave[];
  preferredBrave: Brave;
  user: NewUser;
  errMsg: string;
  loading: boolean;

  constructor( private tokenService: TokenService,
               private userService: UserService,
               private router: Router) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    if ( this.tokenService.getToken() ) {
      this.isLogged = true;
      this.user = new NewUser(this.tokenService.getName(), this.tokenService.getLastname(), this.tokenService.getUserName(), '');
      this.userService.getUserCoins().subscribe(
        data => {
          console.log(data);
          this.userBraves = data.cryptos;
          this.preferredBrave = this.userBraves.find(
            brave => {
              return brave.id === this.user.preferedCryptoID;
            }
          );
        } );
      this.loading = false;
    } else {
      this.isLogged = false;
      this.user = null;
      this.loading = false;
      this.router.navigate(['/login']);
    }
  }

  selectCoin( brave: Brave ): void {
    this.userService.setFavoriteCoin( brave ).subscribe(
      data => {
        // swal.fire('Moneda', 'Moneda asociada con éxito',  'success');
        this.tokenService.setId(data.user.id);
        this.tokenService.setName(data.user.name);
        this.tokenService.setLastname(data.user.lastname);
        this.tokenService.setUserName(data.user.username);
        this.tokenService.setPreferedCryptoId(brave.id);
        this.router.navigate(['/user']);
      }, err => {
        this.errMsg = err.error.message;
        // swal.fire('Registro', this.errMsg, 'error');
      }
    );
  }
}
