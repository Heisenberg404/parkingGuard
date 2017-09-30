import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkingApiService {
  baseUrl = 'http://localhost:54337/api/';
  users: any;
  loggedUser: any;

  constructor(private http: Http) { }

  getUsers(parameter: String) {

    const obj = `{
           "username" : "ElUsuario",
           "pass" : "123"
           }`;
    this.users = obj;
    console.log(obj);
    return this.users;
  }

  checkUser(user: any) {
    const query = `Users`
    const url = this.baseUrl + query;
    console.log(user);
    return this.http.post(url, user).map(res => {
      this.loggedUser = res.json();
      console.log('usuario logueado' + this.loggedUser);
    });

  }
}
