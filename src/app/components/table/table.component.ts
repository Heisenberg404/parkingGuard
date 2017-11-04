import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ParkingApiService} from '../../services/parkingApi.service';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  msjError = '';
  license: '';
  isValidForm= false;
  tableValues: any;
  monthsToPay = 1;
  userMonthSelected = {
      'id': 0,
      'idUser': '',
      'name': '',
      'license': '',
      'startDate': '',
      'endDate': '',
      'isPermited': null,
      'TotalPrice': 0,
      'mensaje': ''
  };
  @Input('loader') loader: boolean;
  @Output() loaderChanged = new EventEmitter();
  recordSelected = {
        'id': '',
        'numCell': '',
        'state': '',
        'license': ''
  };
  itemToSave = {
    'license': '',
    'idprice': 0,
    'idCell': ''
  };

  DISP = 'DISP';
  OCUP = 'OCUP';
  ALQU = 'ALQU';

  showLoader() {
    this.loader = true;
    this.loaderChanged.emit(this.loader);
  }

  hideLoader() {
    this.loader = false;
    this.loaderChanged.emit(this.loader);
  }


  constructor(private _parkingApiService: ParkingApiService) {

  }


  ngOnInit() {
    this.loadDataTable();
  }

  sweetAlert(message: any) {
    swal(
      'Good job!',
      message,
      'success'
    );
  }
  filterTableValues(nFloor) {
    if (this.tableValues) {
      return this.tableValues.filter(x => x.numCell.includes(nFloor) );
    }
  }

  removeWhiteSpace(item) {
    item.state = item.state.trim();
  }
  setRecordSelected(item) {
    this.recordSelected = item;
    if (this.recordSelected.state === 'ALQU') {
      this._parkingApiService.getUserMonthData(this.recordSelected.id).subscribe(result => {
        this.showLoader();
        this.userMonthSelected = result;
        this.hideLoader();
        console.log(this.userMonthSelected);
      });
    }
  }

  inNewVeh() {

    if (this.validateFields()) {
      console.log('record selected');
      console.log(this.recordSelected);
      this.itemToSave.license = this.recordSelected.license;
      this.itemToSave.idCell = this.recordSelected.id;
      this.itemToSave.idprice =  Number(this.recordSelected.numCell.substring(1, 0));
      console.log('item to save');
      console.log(this.itemToSave);
      this._parkingApiService.saveItem(this.itemToSave).subscribe(result => {
        console.log('guardado !');
        this.loadDataTable();
        console.log(result);
        this.sweetAlert("New car in " + this.recordSelected.license + " stored at!! " + this.recordSelected.numCell);
        this.cleanSelected();

      });
    }

  }

  loadDataTable() {
    this._parkingApiService.getAllTablePark().subscribe(result => {
      this.showLoader();
      result.forEach(this.removeWhiteSpace);
      this.tableValues = result;
      console.log(this.tableValues);
      this.hideLoader();
    });
  }

  outVehicle() {
    const itemOut = {
      'license': '',
      'idprice': 0,
      'idCell': ''
    };
    itemOut.license = this.recordSelected.license;
    itemOut.idCell = this.recordSelected.id;
    itemOut.idprice =  Number(this.recordSelected.numCell.substring(1, 0));

    this._parkingApiService.outVehicle(itemOut).subscribe(result => {
      console.log('salio!!');
      this.loadDataTable();
      console.log(result);
    });
  }

  validateFields () {

    if (Number(this.recordSelected.numCell.substring(1, 0)) === 1) {
      if (/[A-Za-z]{3}[0-9]{2}[A-Za-z]{1}/.test(this.recordSelected.license)) {
      this.msjError = '';
      this.isValidForm = true;
      }else {
        this.msjError = 'el campo licencia no concuerda con un número de placa de motocicleta';
        this.isValidForm = false;
        this.recordSelected.license = null;
        console.log(this.recordSelected.numCell);
      }
    } else if (Number(this.recordSelected.numCell.substring(1, 0)) === 2) {
        if (/[A-Za-z]{3}[0-9]{3}/.test(this.recordSelected.license)) {
          this.msjError = '';
          this.isValidForm = true;
      } else {
        this.msjError = 'el campo licencia no concuerda con un número de placa de automovil';
        this.isValidForm = false;
        this.recordSelected.license = null;
        console.log(this.recordSelected.numCell);
      }
    }
    return this.isValidForm;


  }

  saveUserMonth() {
    const userToSave = {
      idUser : this.userMonthSelected.idUser,
      name : this.userMonthSelected.name,
      license : this.userMonthSelected.license,
      startDate : this.userMonthSelected.startDate,
      endDate : this.calcEndDate(),
      parkCell : this.recordSelected.id,
      vehicleType : (Number(this.recordSelected.numCell.substring(1, 0)) === 1 ? 1 : 2)
    };
    console.log('usuario a almacenar: ');
    console.table(userToSave);
    this._parkingApiService.saveUserMonth(userToSave).subscribe(result => {
      console.log('guardado !');
      this.loadDataTable();
      console.log(result);
      this.sweetAlert('New user ' + result.name + ' created!! \n' + 'value to pay: ' + result.TotalPrice);
      this.cleanSelected();
    });
  }

  calcEndDate() {
    const fechaArreglo = this.userMonthSelected.startDate.split('-');
    let mesInicial = Number(fechaArreglo[1]);
    mesInicial = mesInicial + Number(this.monthsToPay);
    if (mesInicial > 12) {
      const rest = mesInicial - 12;
      mesInicial = rest;
    }
    const fechaFin = fechaArreglo[0] + '-' + '0' + mesInicial + '-' + fechaArreglo[2];
    return fechaFin;
  }

  cleanSelected() {
    this.recordSelected.id = '';
    this.recordSelected.license = '';
    this.recordSelected.numCell = '';
    this.recordSelected.state = '';
    this.userMonthSelected.endDate = '';
    this.userMonthSelected.id = 0;
    this.userMonthSelected.idUser = '';
    this.userMonthSelected.isPermited = '';
    this.userMonthSelected.license = '';
    this.userMonthSelected.mensaje = '';
    this.userMonthSelected.name = '';
    this.userMonthSelected.startDate = '';
    this.userMonthSelected.TotalPrice = 0;
  }

  savePayMonth() {
    const payToSave = {
      idUser : this.userMonthSelected.idUser,
      name : this.userMonthSelected.name,
      license : this.userMonthSelected.license,
      startDate : this.userMonthSelected.startDate,
      endDate : this.userMonthSelected.endDate,
      parkCell : this.recordSelected.id,
      idPrice : (Number(this.recordSelected.numCell.substring(1, 0)) === 1 ? 1 : 2)
    };
    console.log('pago a almacenar: ');
    console.table(payToSave);
    this._parkingApiService.savePaymonth(payToSave, this.userMonthSelected.id).subscribe(result => {
      console.log('guardado !');
      this.loadDataTable();
      console.log(result);
      this.sweetAlert('New pay created!! ' + 'value to pay: ' + result.ValorPago);
      this.cleanSelected();
    });

  }


}

