import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ComicsReadResolve implements Resolve<any> {

  constructor(private api: ApiService) {}

  resolve = (): Observable<any> => {
    const readShared$: Observable<any> = this.api.getComicsRead().share();

    const comics$: Observable<any> = readShared$.switchMap(cs => {
      return cs.length ? Observable.forkJoin(...cs.map(c => this.api.getComic(c._id))) : Observable.of([]);
    });

    return Observable.of([]);
  };
}
