import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';

import {
  map
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUpdate: Subject <any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000';

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    if (this.isAuthenticated()) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  change() {
    const token = this.getToken();
    if (token) {
      let parsedtoken: string = JSON.parse(token);
      let data = jwt_decode(parsedtoken.substr(7, ));

      this.http.get(`${this.url}/user/getUserDetailsFromId/${data.id}`)
        .subscribe(res => {
          console.log(res);
          this.userUpdate.next(res);
        });
    }
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      let parsedtoken: string = JSON.parse(token);
      let data = jwt_decode(parsedtoken.substr(7, ));
      return data.id;
    }
  }

  signOutUser() {
    localStorage.clear();
  }

  signInUser(email: string, password: string) {
    return this.http.post(`${this.url}/user/signInUser`, {
      email: email,
      password: password
    })
      .pipe(map(res => res));
  }

  signUpUser(name: string, email: string, password: string, mobile: string) {
    return this.http.post(`${this.url}/user/signUpUser`, {
      name: name,
      password: password,
      mobile: mobile,
      email: email
    })
      .pipe(map(res => res));
  }

  getUserDetailsFromToken() {
    let token = this.getToken();
    if (token) {
      let parsedtoken: string = JSON.parse(token);
      return jwt_decode(parsedtoken.substr(7, ));
    }
  }

  getUserDetailsFromTokenServer() {
    const token = this.getToken();
    if (token) {
      let parsedtoken: string = JSON.parse(token);
      let data = jwt_decode(parsedtoken.substr(7, ));

      return this.http.get(`${this.url}/user/getUserDetailsFromId/${data.id}`)
        .pipe(map(res => res));
    }
  }
}
