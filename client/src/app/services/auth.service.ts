import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:5000';

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  signInUser(email: string, password: string) {
    return this._http.post(`${this.url}/user/signInUser`, {
      email: email,
      password: password
    })
      .pipe(map(res => res));
  }

  signUpUser(name: string, role: string, email: string, password: string, mobile: string) {
    return this._http.post(`${this.url}/user/signUpUser`, {
      name: name,
      role: role,
      password: password,
      mobile: mobile,
      email: email
    })
      .pipe(map(res => res));
  }
  
}
