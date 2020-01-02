import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  mobile: string;
  password: string;
  email: string;

  errors = {
    nameError: '',
    emailError: '',
    passwordError: '',
    mobileError: ''
  };

  errorMessage = null;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
  }

  registerButtonClick (): void {

    this.errorMessage = null;

    if (this.name && this.email && this.password && this.mobile) {
      this._auth.signUpUser(this.name, this.email, this.password, this.mobile)
        .subscribe((res: any) => {
          if (res.token) {
            localStorage.setItem('token', JSON.stringify(res.token));
            this._router.navigate(['/home']);
          } else if (res.message === 'USERALREADYEXISTS') {
            this.errorMessage = "Email or Mobile already in use";
          } else {
            this.errors = {
              ...this.errors,
              nameError: res.message.nameError,
              emailError: res.message.emailError,
              mobileError: res.message.mobileError,
              passwordError: res.message.passwordError
            };
          }
        });
    } else {
      this.errorMessage = "Missing Credentials";
    }
  }

}
