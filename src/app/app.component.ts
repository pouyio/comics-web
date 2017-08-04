import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  noBack = false;
  logged = true;
  resolving: Observable<boolean>;
  subscription: Subscription;
  location: Location;

  constructor(
    location: Location,
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private resolver: ResolveService,
    private cdRef :ChangeDetectorRef
  ) {
    router.events.subscribe(params =>  this.noBack = (router.url === '/login'));
    this.logged = !!this.auth.getToken();
  }

  logout = () => {
    this.logged = false;
    this.api.logout();
  }

  ngOnInit() {
    this.resolving = this.resolver.getState();
    this.cdRef.detectChanges();
  }

}
