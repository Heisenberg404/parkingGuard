import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ParkingApiService} from '../../services/parkingApi.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  msjError = '';
  minutePrice: any;
  monthPrice: any;
  typeSelected: any;
  dataTypeSelected = {
    'id': 0,
    'valueMinute': 0,
    'idVehicleType': 0,
    'valueMonth': 0
  };
  listTypes: any;
  showLogin = false;
  showReport = false;
  @Output() showLoginOut = new EventEmitter();
  @Output() showReportOut = new EventEmitter();

  constructor(private _parkingApiService: ParkingApiService) { }

  ngOnInit() {
    this.loadVehiclesTypes();
  }

  showLoginForm() {
    this.showLogin = true;
    this.showLoginOut.emit(this.showLogin);
  }

  showReportForm() {
    this.showReport = true;
    this.showReportOut.emit(this.showReport);
  }

  loadVehiclesTypes() {
    this._parkingApiService.getTypesVehicles().subscribe(result => {
      this.listTypes = result;
      console.log('lista de vehiculos: ');
      console.log(this.listTypes);
    });
  }

  setVehiValues () {
    if (this.typeSelected) {
      this._parkingApiService.getPricesById(this.typeSelected.id).subscribe(result => {
        if (result) {
          this.dataTypeSelected = result;
        }
      });
    }
  }

  moveBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

 validateFields () {
    if (!/^[0-9]+$/.test(this.minutePrice)) {
      this.msjError = 'el campo minuto solo acepta enteros';
    }else {
      this.msjError = '';
    }
  }
  updatePrice() {
    console.log(this.dataTypeSelected);
    if (this.dataTypeSelected) {
      this._parkingApiService.updatePrice(this.dataTypeSelected).subscribe(result => {
        console.log('update price is: ' + this.dataTypeSelected);
      });
    }

  }


}
