import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
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
    let headers = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers : headers});
    //var res = this.http.post(url, user);
    console.log("request");
    console.log(JSON.stringify(user));
    //this.http.post(url, JSON.stringify(user), options).subscribe(res => console.log("response is: "+res.json));
    return this.http.post(url, JSON.stringify(user), options).map(res => console.log("response is: "+res));
  }
}
