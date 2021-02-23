import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoinsComponent } from './add-coins.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {BravesService} from '../../service/braves.service';
import {TokenService} from '../../service/token.service';
import {UserService} from '../../service/user.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

describe('AddCoinsComponent', () => {
  let component: AddCoinsComponent;
  let fixture: ComponentFixture<AddCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoinsComponent ],
      providers: [AuthService, BravesService, TokenService, UserService, ToastrService, TranslatePipe],
      imports : [ RouterTestingModule, RouterModule, HttpClientTestingModule, ToastrModule.forRoot(),
        TranslateModule.forRoot(), FormsModule],
      schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
