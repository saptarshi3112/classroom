import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000';

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  signInUser(email: string, password: string) {
    console.log('go');
    return this.http.post(`${this.url}/user/signInUser`, {
      email: email,
      password: password
    })
      .pipe(map(res => res));
  }

  signUpUser(name: string, role: string, email: string, password: string, mobile: string) {
    return this.http.post(`${this.url}/user/signUpUser`, {
      name: name,
      role: role,
      password: password,
      mobile: mobile,
      email: email
    })
      .pipe(map(res => res));
  }

  signOutUser() {
    localStorage.clear();
  }

}
