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
  loading = false;
  private typeAheadO: Observable<any>;

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

  constructor(private apollo: Apollo) {
    this.listed = this.searchForm.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .do(e => this.loading = true)
      .switchMap((search: string) => {
        return search ? this.apollo.watchQuery({
          query: this.searchQuery, variables: { search }
        }).valueChanges : Observable.from([]);
      })
      .do(() => this.loading = false);

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
