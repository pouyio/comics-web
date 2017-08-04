import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { ResolveService } from './resolve.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ComicIssueResolve implements Resolve<any> {

  constructor(private api: ApiService, private resolver: ResolveService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.paramMap.get('id');
    let iss = route.paramMap.get('issue');
    return this.api.getComicIssue(id, iss).map(i => i.data)
  }
}
