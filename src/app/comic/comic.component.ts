import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

@Component({
  selector: 'pou-comic',
  templateUrl: './comic.component.html'
})
export class ComicComponent {

  comic: any;

  comic$;
  private comicQuery = gql`
  query comic($comicId: String!) { 
    comic (_id: $comicId) { 
      _id
      title
      publication_date
      status
      summary
      cover
      wish
      issues {
        id
        __typename
        title
        read
        percentage
        read
      }
      artists {
        first_name
        last_name
      }
      publishers {
        name
      }
      writers {
        first_name
        last_name
      }
      genres {
        name
      }
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

  private updateIssueRead = gql`
  mutation ($comicId: String!, $issueId: String!, $isRead: Boolean! ) {
    updateIssue(_id: $comicId, issue: $issueId, isRead: $isRead) {
      _id
      __typename
      issues(id: $issueId) {
        id
        __typename
        read
        percentage
      }
    }
  }
  `;


  constructor(private api: ApiService, private route: ActivatedRoute, private apollo: Apollo) {
    this.comic$ = this.apollo.watchQuery({
      query: this.comicQuery, variables: { comicId: this.route.snapshot.params.id }
    }).valueChanges;
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

  markIssueRead = (event) => {
    this.apollo.mutate({
      mutation: this.updateIssueRead,
      variables: {
        comicId: event.comic,
        issueId: event.issue,
        isRead: event.val
      }
    }).subscribe();
  }

}
