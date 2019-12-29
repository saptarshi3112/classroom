import { Component, OnInit, OnChanges } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  constructor(private _auth: AuthService) { }

  isAuthenticated: boolean;

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  ngOnChanges(): void {
    if (this._auth.isAuthenticated()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  createClass() {
    console.log('class create');
  }

  joinClass() {
    console.log('join class');
  }

}
