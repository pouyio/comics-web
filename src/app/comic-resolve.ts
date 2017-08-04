import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { ResolveService } from './resolve.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ComicResolve implements Resolve<Observable<any>> {

  constructor(private api: ApiService, private resolver: ResolveService) {}

  resolve = (route: ActivatedRouteSnapshot) => this.api.getComic(route.paramMap.get('id'));
}
