import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private _token: AuthService,
    private router: Router
  ) {}

  canActivate() {
    const accessToken = this._token.getToken();
    if (accessToken) {
      return true;
    } else {
      console.log("hello");
      this.router.navigate(['login']);
      return false;
    }
  }
}
