import { Component, OnInit } from '@angular/core';
import { Observable } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, share, filter } from 'rxjs/operators';

@Component({
  selector: 'pou-home',
  templateUrl: './home.component.html',
  styles: [`
  li.is-active > a {
    background-color: whitesmoke !important ;
  }
  `]
})
export class HomeComponent implements OnInit {

  $comics;
  selectedTab = 'home';

  private comicsQuery = gql`{ 
    wished: comics (wish: true) { 
      _id
      title
      wish
      cover
      status
    },
    lastUpdated: comics (onlyNew: true) {
      _id
      title
      wish
      cover
      status
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

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.$comics = this.apollo.watchQuery({ query: this.comicsQuery })
      .valueChanges
      .pipe(
        pluck('data'),
        share()
        );

    this.route.queryParams.pipe(pluck('tab'), filter((tab: string) => !!tab)).subscribe((tab: string) => this.selectedTab = tab);

  }

  toggleComicWish = (comic) => {
    const isWish = !comic.wish;
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
          wish: !comic.wish,
        },
      },
    }).subscribe();
  }

  selectTab(tab) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab } });
  }

}
