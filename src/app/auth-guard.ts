import { CanActivate, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(AuthService) private auth: AuthService, @Inject(Router) private router: Router) {}

  canActivate = () => {
    if(!!this.auth.getToken()) return true;
    this.router.navigate(['/login']);
  };

}
