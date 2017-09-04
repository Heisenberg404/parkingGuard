import { Component, OnInit } from '@angular/core';
import { ParkingApiService} from '../../services/parkingApi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: String = '';

  constructor(private _parkingApiService:ParkingApiService) { }



  ngOnInit() {
  }

  getUser (){

  this._parkingApiService.getUsers(this.user).subscribe();

  }

}
