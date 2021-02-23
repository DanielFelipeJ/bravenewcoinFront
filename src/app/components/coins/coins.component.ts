import { Component, OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CoinsComponent implements OnInit {

  links = [{path: 'make_changes', label: 'MAKE_CHANGES'}, {path: 'brave_list', label: 'LIST_OF_COINS'}];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
