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

}
