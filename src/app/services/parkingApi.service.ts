import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkingApiService {
  //baseUrl = 'http://localhost:54337/api/';
  baseUrl = 'http://parkingapp.apphb.com/api/';
  users: any;
  data: any = null;
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
    const query = `Users`;
    const url  = this.baseUrl + query;
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers : headers});
    console.log('request');
    console.log(JSON.stringify(user));
    return this.http.post(url, JSON.stringify(user), options).map(res => res.json());

  }

  getAllTablePark() {
    const query = 'ParkCells';
    const  url = this.baseUrl + query;
    return this.http.get(url).map(res => res.json());
  }

  saveItem(vehicle: any) {
    const query = 'Records';
    const url = this.baseUrl + query;
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers : headers});
    return this.http.post(url, JSON.stringify(vehicle), options).map(res => res.json());
  }

}
