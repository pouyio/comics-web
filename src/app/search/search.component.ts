import { Component, ChangeDetectionStrategy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'pou-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  listed: Observable<any>;
  searchForm = new FormControl();
  isLoading = false;

  @ViewChild('resultsList') resultsList: ElementRef;

  private searchQuery = gql`
  query searchComics($search: String!) {
    comics(search: $search){
      _id
      title
      cover
      wish
      publication
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
    }).valueChanges : of({ data: { comics: [] } });
  }

  constructor(private apollo: Apollo, private router: Router) {

    this.listed = this.searchForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(search => this.search$(search)),
      map(({ data }) => data.comics),
      tap(() => this.isLoading = false));
    // this.listed = Observable.of('spawn')
    //   .debounceTime(500)
    //   .distinctUntilChanged()
    //   .do(() => this.isLoading = true)
    //   .switchMap(search => this.search$(search))
    //   .map(({ data }) => data.comics)
    //   .do(() => this.isLoading = false);

  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement || !this.resultsList) {
      return;
    }
    const clickedInside = this.resultsList.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.searchForm.reset();
    }
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
