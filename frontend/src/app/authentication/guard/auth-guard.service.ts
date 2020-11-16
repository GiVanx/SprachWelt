import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.loadUser();

    const pathCondition =
      state.url.includes('/auth/login') || state.url.includes('/auth/register');

    if (user) {
      if (pathCondition) {
        this.router.navigate(['/']);
        return false;
      }
    } else if (!pathCondition) {
      this.router.navigate(['auth', 'login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
