import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {CoinsComponent} from './components/coins/coins.component';
import {MakeChangesComponent} from './components/make-changes/make-changes.component';
import {BraveListComponent} from './components/brave-list/brave-list.component';
import {MatSelectModule} from '@angular/material/select';
import {UserComponent} from './components/user/user.component';
import {AddCoinsComponent} from './components/add-coins/add-coins.component';
import {SelectCoinsComponent} from './components/select-coins/select-coins.component';

const routes: Routes = [
  {path: '',              component: HomeComponent},
  {path: 'login',         component: LoginComponent},
  {path: 'signup',        component: SignupComponent},
  {path: 'user',          component: UserComponent},
  {path: 'add-coins',     component: AddCoinsComponent},
  {path: 'select-coins',  component: SelectCoinsComponent},
  {path: 'coins',         component: CoinsComponent,
    children: [
      { path: '', redirectTo: 'make_changes', pathMatch: 'full' },
      { path: 'make_changes', component: MakeChangesComponent },
      { path: 'brave_list', component: BraveListComponent  },
    ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSelectModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
