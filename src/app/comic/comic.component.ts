import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { switchMap, pluck, filter } from 'rxjs/operators';

@Component({
  selector: 'pou-comic',
  templateUrl: './comic.component.html'
})
export class ComicComponent implements OnInit {

  comic$: Observable<any>;
  selectedTab = 'general';

  private comicQuery = gql`
  query comic($comicId: ID!) { 
    comic (_id: $comicId) { 
      _id
      title
      last_update
      publication
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
        id
        name
      }
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

  private updateIssueRead = gql`
  mutation ($comicId: ID!, $issueId: String!, $isRead: Boolean! ) {
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


  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {

    this.comic$ = this.route.params.pipe(switchMap(({ id }) => this.apollo.watchQuery({
      query: this.comicQuery, variables: { comicId: id }
    }).valueChanges));

  }

  ngOnInit() {
    this.route.queryParams.pipe(pluck('tab'), filter((tab: string) => !!tab)).subscribe((tab: string) => this.selectedTab = tab);
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

  onSelectTab(tab) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab } });
  }

}
