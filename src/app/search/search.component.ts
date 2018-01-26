import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

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
      summary
    }
  }
  `;

  private markComicWish = gql`
  mutation ($comicId: String!, $wish: Boolean!) {
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

  constructor(private apollo: Apollo) {
    this.listed = this.searchForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .do(() => this.isLoading = true)
      .switchMap(search => this.search$(search))
      .map(({ data }) => data.comics)
      .do(() => this.isLoading = false)

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

  limit(text = '', limit = 3) {
    return text.length - 3 > limit ? text.substring(0, limit - 3).concat('...') : text;
  }

}
