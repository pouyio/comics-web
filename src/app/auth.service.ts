import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private token: string;

  constructor(private router: Router) {
    this.token = localStorage.getItem('currentUser');
 }

  getToken = (): string => {
    if(this.token) return this.token;
    return localStorage.getItem('currentUser');
  }

  setToken = (tk): void => {
    localStorage.setItem('currentUser', tk);
    this.token = tk;
  }

  removeToken = (): void => {
    localStorage.removeItem('currentUser');
    this.token = '';
    this.router.navigate(['login']);
  }

}
