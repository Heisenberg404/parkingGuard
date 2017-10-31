import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkingApiService {
  baseUrl = 'http://localhost:54337/api/';
  //baseUrl = 'http://parkingapp.apphb.com/api/';
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

  outVehicle (vehicleOut: any) {
    const query = 'Records/' + vehicleOut.idCell;
    const url = this.baseUrl + query;
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers : headers});
    return this.http.put(url, JSON.stringify(vehicleOut), options).map(res => res.json());
  }

  getTypesVehicles () {
    const query = 'VehicleTypes';
    const url = this.baseUrl + query;
    return this.http.get(url).map(res => res.json());
  }

  getPricesById (id: any) {
    const query = 'Prices';
    const url = this.baseUrl + query + '/' + id;
    return this.http.get(url).map(res => res.json());
  }

  updatePrice (param: any) {
    const query = 'Prices/' + param.id;
    const url = this.baseUrl + query;
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers : headers});
    return this.http.put(url, JSON.stringify(param), options).map(res => res.json());
  }

  getUserMonthData (id: any){
    const query = 'UserMonthPayments';
    const url = this.baseUrl + query + '/' + id;
    return this.http.get(url).map(res => res.json());
  }

  saveUserMonth (userMonth: any) {
    const query = 'UserMonthPayments';
    const url = this.baseUrl + query;
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers : headers});
    return this.http.post(url, JSON.stringify(userMonth), options).map(res => res.json());
  }

  savePaymonth(data: any, id: number) {
    const query = 'UserMonthPayments/' + id;
    const url = this.baseUrl + query;
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers : headers});
    return this.http.put(url, JSON.stringify(data), options).map(res => res.json());
  }

  getDataReport() {
    const query = 'Records';
    const url = this.baseUrl + query;
    return this.http.get(url).map(res => res.json());
  }
}
