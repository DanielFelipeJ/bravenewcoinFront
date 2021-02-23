import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Brave} from '../../models/brave';
import {BravesService} from '../../service/braves.service';
import {ActivatedRoute} from '@angular/router';
import {from} from 'rxjs';

@Component({
  selector: 'app-make-changes',
  templateUrl: './make-changes.component.html',
  styleUrls: ['./make-changes.component.sass']
})

export class MakeChangesComponent implements OnInit {

  form: FormGroup;
  currencies: Brave[] = [];
  currencyFromValue = '';
  currencyToValue = '';
  result = 0;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private currencyService: BravesService,
    private activeRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.buildForm();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getCurrencies();
    const currenciesDefault = ['BTC', 'BTC'];
    this.form.get('currencyFrom').setValue(currenciesDefault[0]);
    this.form.get('currencyTo').setValue(currenciesDefault[1]);
    [this.currencyFromValue, this.currencyToValue] = currenciesDefault;
    if (this.activeRoute.snapshot.queryParams.convertFrom) {
      this.activeRoute.queryParams.subscribe(params => {
        this.form.get('currencyFrom').setValue(params.convertFrom);
      });
    }
    this.loading = false;
  }

  private buildForm(): any {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      currencyFrom: ['', [Validators.required]],
      currencyTo: ['', [Validators.required]],
      result: ['']
    });
  }

  getCurrencies(): any {
    this.currencyService.getCoins().subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  convertCurrencies(): void {
    this.loading = true;
    if (this.form.valid) {
      [this.currencyFromValue, this.currencyToValue] = [this.form.value.currencyFrom, this.form.value.currencyTo];
      const fromCurrency =  this.currencies.find(currency => currency.symbol === this.form.value.currencyFrom);
      const toCurrency =  this.currencies.find(currency => currency.symbol === this.form.value.currencyTo);
      this.result = ( fromCurrency.value / toCurrency.value) * this.form.value.amount;
      this.form.get('result').setValue(this.result.toFixed(8));
    }
    this.loading = false;
  }

  exchangeValues(): void{
    this.loading = true;
    this.form.get('currencyFrom').setValue(this.currencyToValue);
    this.form.get('currencyTo').setValue(this.currencyFromValue);
    this.convertCurrencies();
    this.loading = false;
  }

}
