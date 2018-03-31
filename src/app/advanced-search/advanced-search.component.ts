import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  searchQuery,
  queryFactory
} from './queries';

@Component({
  selector: 'pou-advanced-search',
  templateUrl: './advanced-search.component.html'
})
export class AdvancedSearchComponent implements OnInit {

  rForm: FormGroup;
  genres$: Observable<{}>;
  writers$: Observable<{}>;
  artists$: Observable<{}>;
  publishers$: Observable<{}>;
  comics$: Observable<any[]>;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

    this.rForm = this.fb.group({
      text: this.route.snapshot.queryParams.search,
      number: this.route.snapshot.queryParams.numberOfIssues,
      writers: '',
      artists: '',
      publishers: ''
    });

  }

  ngOnInit() {


    this.genres$ = this.apollo.query({ query: queryFactory('genres') }).pluck('data').pluck('genres');

    this.comics$ = this.route.queryParams.switchMap((params: any) => {
      return this.apollo.query({ query: searchQuery, variables: params }).pluck('data').pluck('comics');
    });

  }

  onSelect(type, id) {
    const params = { ...this.route.snapshot.queryParams };
    if (!params[type]) {
      params[type] = [];
    }

    if (typeof params[type] === 'string') {
      params[type] = [params[type]];
    }

    if (params[type].includes(id)) {
      params[type] = params[type].filter(element => element !== id);
    } else {
      params[type] = params[type].concat(id);
    }

    this.router.navigate([], { relativeTo: this.route, queryParams: params });
  }

  queryParamsContains(type, id: string): boolean {
    const params = this.route.snapshot.queryParams;
    if (!params[type]) return false;
    if (params[type] === id) return true;
    return params[type].includes(id);
  }

  toggleEntity($event) {
    this.rForm.patchValue({ [$event.type]: '' });
    this.onSelect($event.type, $event.entityId);
  }

  getEntities(type) {
    const entities = this.route.snapshot.queryParams[type] || [];
    return Array.isArray(entities) ? entities : [entities];
  }

  reset() {
    this.rForm.reset();
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
  }

}
