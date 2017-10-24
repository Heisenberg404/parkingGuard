import { Component, OnInit } from '@angular/core';
import { ParkingApiService} from '../../services/parkingApi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  user: any = {
    id : '',
    username : '',
    pass : '',
    operacion : false
  };

  msjError = '';

  loggedUSer: any = null;

  constructor(private _parkingApiService: ParkingApiService) { }

  ngOnInit() {
  }

  getUser () {
    this._parkingApiService.getUsers(this.user).subscribe();
  }
  checkUser () {
    this.validateFields ();
    if (this.msjError='') {
    this._parkingApiService.checkUser(this.user).subscribe(result => {
      console.log('resultado: ' + result);
      this.loggedUSer = result;
      console.log('el usuario en sesion es: ' + this.loggedUSer.username + 'con id: ' + this.loggedUSer.id);
    });
    }else {
      console.log(this.msjError);
    }
  }

  validateFields () {
    if (/^[0-9]+$/.test(this.user.username)) {
      this.msjError = 'el usuario debe ser solo letras';
    } else if (!/^[0-9]+$/.test(this.user.pass)) {
      this.msjError = 'f'
    } else {
      this.msjError = '';
    }
  }

}
