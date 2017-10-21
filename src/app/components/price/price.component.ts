import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  msjError = '';
  minutePrice: any;
  monthPrice: any;
  constructor() { }

  ngOnInit() {
  }

  validateFields () {
    if (!/^[0-9]+$/.test(this.minutePrice)) {
      this.msjError = 'el campo minuto solo acepta enteros';
    }else {
      this.msjError = '';
    }
  }
}
