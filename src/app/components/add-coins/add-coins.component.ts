import { Component, OnInit } from '@angular/core';
import {NewUser} from '../../models/new-user';
import {Brave} from '../../models/brave';
import {TokenService} from '../../service/token.service';
import {UserService} from '../../service/user.service';
import {BravesService} from '../../service/braves.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.sass']
})
export class AddCoinsComponent implements OnInit {

  isLogged = false;
  user: NewUser;
  errMsg: string;
  braves: Brave[] = [];
  loading: boolean;

  constructor( private tokenService: TokenService,
               private userService: UserService,
               private braveService: BravesService,
               private router: Router) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    if ( this.tokenService.getToken() ) {
      this.isLogged = true;
      this.user = new NewUser( this.tokenService.getName(), this.tokenService.getLastname(), this.tokenService.getUserName(), '');
      this.braveService.getCoins().subscribe(
        braves => {
          this.braves = braves;
          this.loading = false;
        }
      );
    } else {
      this.isLogged = false;
      this.user = null;
      this.loading = false;
      this.router.navigate(['/login']);
    }
   }

   selectCoin(brave: Brave): void {
    this.userService.addCoin(brave).subscribe(
      data => {
        // swal.fire('Moneda', 'Moneda agregada con éxito', 'success');
        this.tokenService.setId(data.user.id);
        this.tokenService.setName(data.user.name);
        this.tokenService.setLastname(data.user.lastname);
        this.tokenService.setUserName(data.user.username);
        this.router.navigate(['/user']);
      }, err => {
        this.errMsg = err.error.message;
        // swal.fire('Agregar moneda', this.errMsg, 'error');
        console.log(this.errMsg);
      }
    );
   }
}
