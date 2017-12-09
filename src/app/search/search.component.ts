import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  listed: Observable<any[]>;
  searchForm = new FormControl();
  loading: boolean = false;
  private routeChangeO: Observable<any[]>;
  private typeAheadO: Observable<any[]>;

  constructor(private api: ApiService, private router: Router) {
    this.routeChangeO = router.events.map(e => []);
    this.typeAheadO = this.searchForm.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .do(e => this.loading = true)
      .switchMap(term => (term && term.length > 3) ? api.search(term) : Observable.of([]))
      .do(e => this.loading = false);

    this.listed = Observable.merge(this.routeChangeO, this.typeAheadO);
  }

  toggleComicWish(comic) {
    let isWish = !comic.wish;
    this.api.markComicWish(comic._id, isWish).subscribe(res => {
      if (res.ok) comic.wish = isWish;
    });
  }

  limit(text = '', limit = 3) {
    return text.length > (limit - 3) ? text.substring(0, limit - 3).concat('...') : text;
  }

}
