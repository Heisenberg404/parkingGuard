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
    let headers = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers : headers});
    //var res = this.http.post(url, user);
    console.log("request");
    console.log(JSON.stringify(user));
    //this.http.post(url, JSON.stringify(user), options).subscribe(res => console.log("response is: "+res.json));
    return this.http.post(url, JSON.stringify(user), options).map(res => console.log("response is: "+res));
  }
}
