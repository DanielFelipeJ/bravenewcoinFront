import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import { BraveListComponent } from './components/brave-list/brave-list.component';
import { MakeChangesComponent } from './components/make-changes/make-changes.component';
import { CoinsComponent } from './components/coins/coins.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { UserComponent } from './components/user/user.component';
import { AddCoinsComponent } from './components/add-coins/add-coins.component';
import { SelectCoinsComponent } from './components/select-coins/select-coins.component';
import {interceptorProvider} from './interceptors/user-interceptor.service';
import { LoadingComponent } from './components/shared/loading/loading.component';

// tslint:disable-next-line:typedef
export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    BraveListComponent,
    MakeChangesComponent,
    CoinsComponent,
    FooterComponent,
    UserComponent,
    AddCoinsComponent,
    SelectCoinsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
