import { Component, OnInit } from '@angular/core';
import { ParkingApiService} from '../../services/parkingApi.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  tableValues: any;
  constructor(private _parkingApiService: ParkingApiService) { }

  ngOnInit() {
    this.loadDataReport();
  }

  loadDataReport () {
    this._parkingApiService.getDataReport().subscribe(result => {
      this.tableValues = result;
      console.log("valores del reporte");
      console.table(this.tableValues);
    });
  }

}
