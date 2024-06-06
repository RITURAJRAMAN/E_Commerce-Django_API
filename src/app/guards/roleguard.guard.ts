import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleguardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var token: any = localStorage.getItem('token');
    if (!token) {
      alert('You are not an Admin user !!');
      this.router.navigateByUrl('/');
      return false;
    }
    let decoded: any = jwtDecode<JwtPayload>(token);
    if (decoded.user_id == 1) {
      return true;
    }

    alert('You are not an Admin user !!');
    this.router.navigateByUrl('/');
    return false;
  }
}
