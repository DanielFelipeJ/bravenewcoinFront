import { Component, OnInit } from '@angular/core';
import {Brave} from '../../models/brave';
import {BravesService} from '../../service/braves.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brave-list',
  templateUrl: './brave-list.component.html',
  styleUrls: ['./brave-list.component.sass']
})
export class BraveListComponent implements OnInit {

  displayedColumns: string[] = [
    'nombre',
    'precio',
    'criptomoneda',
    'convertir'
  ];

  dataSource: Brave[] = [];
  loading: boolean;

  constructor( private currencyService: BravesService,
               private router: Router) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.currencyService.getCoins().subscribe(currencies => {
      this.dataSource = currencies;
      this.loading = false;
    });
  }

}
