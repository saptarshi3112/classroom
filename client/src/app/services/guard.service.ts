
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate() {
    if (this._authService.isAuthenticated()) {
        return false;
    }
    this._router.navigate(['/user/auth']);
    return false;
  }

}