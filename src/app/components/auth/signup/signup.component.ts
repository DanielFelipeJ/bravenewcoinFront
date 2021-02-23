import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {LoginUser} from '../../../models/login-user';
import {TokenService} from '../../../service/token.service';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {NewUser} from '../../../models/new-user';
import {switchAll} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  isRegistered = false;
  isRegisterFail = false;
  newUser: NewUser;
  username: string;
  name: string;
  lastname: string;
  password: string;
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
    if (this.tokenService.getToken()){
      this.isRegistered = true;
    }
    this.loading = false;
  }

  onRegister(): void {
    this.loading = true;
    this.newUser = new NewUser(this.name, this.lastname, this.username, this.password);
    this.authService.newUser(this.newUser).subscribe(
      data => {
        this.isRegistered = true;
        this.isRegisterFail = false;
        this.toastr.success('El usuario ha sido creado con éxito', 'Registro', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
        // swal.fire('Registro', `El usuario: ha sido creado con éxito`, 'success');
        console.log(data);
        this.loading = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.isRegistered = false;
        this.isRegisterFail = true;
        this.errMsg = err.error.message;
        this.loading = false;
        this.toastr.error(this.errMsg, 'Error', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
        // swal.fire('Registro', this.errMsj, 'error');
        console.log(this.errMsg);
      }
    );
  }
}
