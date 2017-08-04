import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: any;
  constructor(private api: ApiService, private router: Router) { }

  private _success = () => this.router.navigate(['comics']);
  private _error = (e) => alert(e.text());

  login = (user: string) => this.api.login(user).subscribe(this._success, this._error);

}
