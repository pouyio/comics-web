import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  user: any;
  constructor(private api: ApiService, private router: Router) { }

  private _success = () => this.router.navigate(['comics']);

  login = (user: string) => this.api.login(user).subscribe(this._success, alert);

}
