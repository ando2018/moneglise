

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'any'
})
export class AuthGuardService implements CanActivate {

  constructor(private route: Router, private cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (atob(this.cookieService.get('session-key')).split('.')[0] == 'OK') {
      if (parseInt(atob(this.cookieService.get('session-key')).split('.')[1]) + (1 * 60 * 60 * 1000) >= Date.now()) {
        return true;
      } else {
        this.route.navigateByUrl('/accueil');
        return false;
      }
    }
    this.route.navigateByUrl('/accueil');
    return false;
  }

}
