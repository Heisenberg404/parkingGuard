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
  isValidForm = false;

  loggedUSer: any = null;

  constructor(private _parkingApiService: ParkingApiService) { }

  ngOnInit() {
  }

  getUser () {
    this._parkingApiService.getUsers(this.user).subscribe();
  }
  checkUser () {
    this.validateFields ();
    if (this.isValidForm) {
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
    if ( !/^[A-Za-z]+$/.test(this.user.username)) {
      this.msjError = 'el usuario es obligatorio y solo deben ser letras';
      this.isValidForm = false;
    } else if (isFinite(this.user.pass)) {
      this.msjError = 'el pass no debe ser nullo';
      this.isValidForm = false;
    } else {
      this.msjError = '';
      this.isValidForm = true;
    }
  }
  logOut() {
    this.loggedUSer = null;

  }

}
