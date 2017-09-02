import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkingApiService {

  users: any;


  constructor(private http: Http) { }

  getUsers(parameter: String) {

    const obj = `{
           "username" : "ElUsuario",
           "pass" : "123"
           }`;
    this.users = obj;
    return this.users;
    /*
    let query = `?q=${parameter}&type=artist`;
    let url = this.urlSearch + query;
    let headers = new Headers();
    headers.append('authorization', 'Bearer BQBs_8ksb_EeRief6YyJIU42reUXKvJWASUyzuKq9YzA2mTHaqTQ9gFu6ujc2PKxaf2Qfz9DLOEOWy6nabyIqw');
    return this.http.get(url, {headers} ).map( res => {
      // console.log(res.json().artists);
      this.artists = res.json().artists.items;
      console.log(this.artists);
      // return this.artists;
    });*/
  }
}
