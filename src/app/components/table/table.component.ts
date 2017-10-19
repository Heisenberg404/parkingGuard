import { Component, OnInit } from '@angular/core';
import { ParkingApiService} from '../../services/parkingApi.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableValues: any;

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
  constructor(private _parkingApiService: ParkingApiService) { }


  ngOnInit() {
    this.loadDataTable();
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

  loadDataTable() {
    this._parkingApiService.getAllTablePark().subscribe(result => {
      result.forEach(this.removeWhiteSpace);
      this.tableValues = result;
      console.log(this.tableValues);
    });
  }
}
