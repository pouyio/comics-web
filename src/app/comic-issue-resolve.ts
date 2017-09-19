import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { ResolveService } from './resolve.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ComicIssueResolve implements Resolve<any> {

  constructor(private api: ApiService, private resolver: ResolveService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.api.getComicIssue(route.paramMap.get('id'), route.paramMap.get('issue'));
  }
}
