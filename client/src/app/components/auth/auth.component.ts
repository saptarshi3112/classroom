import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  email: string;
  password: string;

  constructor(private _auth: AuthService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  signInUser(): void {
    this._auth.signInUser(this.email, this.password)
      .subscribe(res => {
        console.log(res);
      });
  }

}
