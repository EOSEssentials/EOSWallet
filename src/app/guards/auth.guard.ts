import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {LocalStorage} from 'ngx-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {
  @LocalStorage()
  isLogged: boolean;

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLogged) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
