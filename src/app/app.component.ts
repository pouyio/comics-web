import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'pou-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isActive: boolean;
  logged: Boolean;
  resolving: Observable<Boolean>;
  subscription: Subscription;
  location: Location;
  breadcrumbs: any[] = [];

  constructor(
    location: Location,
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private resolver: ResolveService,
    private cdRef: ChangeDetectorRef
  ) {
    router.events.subscribe((params: NavigationEnd) => {
      this.logged = params.url !== '/login';
      if (!params.url) return;
      this.breadcrumbs = params.url.split('/').slice(2);
    });
    this.logged = !!this.auth.getToken();
  }

  ngOnInit() {
    this.resolving = this.resolver.getState();
    this.cdRef.detectChanges();
  }

  getBreadcrumbs = (breadcrumbs) => {
    return breadcrumbs.reduce((acc, title) => {
      let url = '';
      if (!acc.length) {
        url = `/comic/${title}`;
      } else {
        url = `${acc[acc.length - 1].url}/${title}`;
      }
      const obj = { url, title };
      acc.push(obj)
      return acc;
    }, []);
  }

  logout = () => {
    this.logged = false;
    this.api.logout();
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  goTo(route) {
    this.router.navigate([route]);
    this.isActive = false;
  }


}
