import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {LoginUser} from '../../../models/login-user';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;
  username: string;
  password: string;
  roles: string[] = [];
  errMsg: string;
  loading: boolean;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
    this.loading = false;
  }

  onLogin(): void {
    this.loading = true;
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.username);
        this.tokenService.setId(data.user.id);
        this.tokenService.setName(data.user.name);
        this.tokenService.setLastname(data.user.lastname);
        this.tokenService.setAuthorities(data.roles);
        if (data.user.preferedCryptoId != null) {
          this.tokenService.setPreferedCryptoId(data.user.preferedCryptoId);
        }
        this.roles = data.roles;
        this.loading = false;
        this.router.navigate(['/']);
        this.toastr.success('Inicio de sesión exitoso', data.user.name, {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsg = err.error.message;
        this.loading = false;
        this.toastr.error('Error al iniciar sesión: ' + this.errMsg , 'Error', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

}
