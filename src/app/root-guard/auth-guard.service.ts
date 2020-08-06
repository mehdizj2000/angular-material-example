import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private oktaAuth: OktaAuthService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = await this.oktaAuth.isAuthenticated();
    if (authenticated) { return true; }

    // Redirect to login flow.
    this.oktaAuth.login(state.url);
    return false;
  }

}
