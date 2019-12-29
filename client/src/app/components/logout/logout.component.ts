import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this._auth.signOutUser();
      this._router.navigate(['/user/auth']);
    } else {
      this._router.navigate(['/home']);
    }
  }

}
