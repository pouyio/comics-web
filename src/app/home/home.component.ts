import { Component, OnInit } from '@angular/core';
import { Observable } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

@Component({
  selector: 'pou-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  $comics;
  private comicsQuery = gql`{ 
    comics (wish: true) { 
      _id
      title
      wish
      cover
      status
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

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.$comics = this.apollo.watchQuery({ query: this.comicsQuery }).valueChanges.share();
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

}
