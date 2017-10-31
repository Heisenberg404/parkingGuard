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

  sweetAlert() {
    swal(
      'Good job!',
      'You clicked the button!',
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
    return this.isValidForm;
    }else if (Number(this.recordSelected.numCell.substring(1, 0)) === 2) {
        if (/[A-Za-z]{3}[0-9]{3}/.test(this.recordSelected.license)) {
      this.msjError = '';
      this.isValidForm = true;
    }else {
      this.msjError = 'el campo licencia no concuerda con un número de placa de automovil';
      this.isValidForm=false;
       this.recordSelected.license=null;
      console.log(this.recordSelected.numCell);
    }
    return this.isValidForm;
    }


  }

}

