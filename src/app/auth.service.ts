import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private token: string;

  constructor(private router: Router) {
    this.token = localStorage.getItem('token');
 }

  getToken = (): string => {
    if(this.token) return this.token;
    return localStorage.getItem('token') || '';
  }

  setToken = (tk): void => {
    localStorage.setItem('token', tk);
    this.token = tk;
  }

  removeToken = (): void => {
    localStorage.removeItem('token');
    this.token = '';
    this.router.navigate(['login']);
  }

}
