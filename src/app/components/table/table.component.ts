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
        'id': 0,
        'numCell': '',
        'state': '',
        'license': ''
  };
  DISP = 'DISP';
  OCUP = 'OCUP';
  ALQU = 'ALQU';
  constructor(private _parkingApiService: ParkingApiService) { }


  ngOnInit() {
    this._parkingApiService.getAllTablePark().subscribe(result => {
      result.forEach(this.removeWhiteSpace);
      this.tableValues = result;
      console.log(this.tableValues);
    });
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

}
