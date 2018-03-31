import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'pou-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  listed: Observable<any>;
  searchForm = new FormControl();
  isLoading = false;

  private searchQuery = gql`
  query searchComics($search: String!) {
    comics(search: $search){
      _id
      title
      cover
      wish
      publication_date
      status
      summary
    }
  }
  `;

  private markComicWish = gql`
  mutation ($comicId: ID!, $wish: Boolean!) {
    markComicWish(_id: $comicId, wish: $wish) {
      _id
      wish
    }
  }
  `;

  private search$ = (search): Observable<any> => {
    return search ? this.apollo.watchQuery({
      query: this.searchQuery, variables: { search }
    }).valueChanges : Observable.of({ data: { comics: [] } });
  }

  constructor(private apollo: Apollo, private router: Router) {
    this.listed = this.searchForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .do(() => this.isLoading = true)
      .switchMap(search => this.search$(search))
      .map(({ data }) => data.comics)
      .do(() => this.isLoading = false);
    // this.listed = Observable.of('spawn')
    //   .debounceTime(500)
    //   .distinctUntilChanged()
    //   .do(() => this.isLoading = true)
    //   .switchMap(search => this.search$(search))
    //   .map(({ data }) => data.comics)
    //   .do(() => this.isLoading = false);

  }

  toggleWish = (comic) => {
    this.apollo.mutate({
      mutation: this.markComicWish,
      variables: {
        comicId: comic._id,
        wish: !comic.wish
      },
      optimisticResponse: {
        __typename: 'Mutation',
        markComicWish: {
          __typename: 'Comic',
          _id: comic._id,
          wish: !comic.wish
        },
      },
    }).subscribe();
  }

  onGoTo = (comicId) => {
    this.searchForm.reset();
    this.router.navigate(['/comic', comicId]);
  }

}
