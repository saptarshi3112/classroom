import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  email: string;
  password: string;

  errors = {
    emailError: null,
    passwordError: null
  };

  errorMessage = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      console.log('auth');
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
  }

  signInUser(): void {

    this.errorMessage = null;

    if (this.email && this.password) {
      this.auth.signInUser(this.email, this.password)
        .subscribe((res: any) => {
          if (res.token) {
            const token = res.token;
            localStorage.setItem('token', JSON.stringify(token));
            this.router.navigate(['/home']);
          } else if (res.message === 'USER404' || res.message === 'PASSWORDINVALID') {
            if (res.message === 'USER404') {
              this.errorMessage = "User does not exists";
            } else {
              this.errorMessage = "Password Invalid!!!";
            }
          } else if (res.message) {
            this.errors = {
              ...this.errors,
              emailError: res.message.emailError,
              passwordError: res.message.passwordError
            };
          }
        }
        );
    } else {
      this.errorMessage = "Missing Credentials";
    }

  }

}
