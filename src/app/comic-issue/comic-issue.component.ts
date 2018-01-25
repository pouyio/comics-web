import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { ApiService } from '../api.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pou-comic-issue',
  templateUrl: './comic-issue.component.html'
})
export class ComicIssueComponent implements OnInit {
  issue$: Observable<any>;

  private updateQuery = gql`
  mutation ($comic: String!, $issue: String!, $page: Int!) {
    updateIssue(_id: $comic, issue: $issue, page: $page) {
      issues(id: $issue) {
        id
        __typename
        page
      } 
    }
  }
  `;

  constructor(private api: ApiService, private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.issue$ = this.route.params.switchMap(this.getIssue);
  }

  private getIssue = params => this.apollo.watchQuery({
    query: gql`
    query IssueDetail($comic: String!, $issue: String!) { 
      comic(_id: $comic) {
        _id
        __typename
        issues(id: $issue) {
          __typename
          id
          page
          pages
        }
      }
    }
    `,
    variables: {
      comic: params.id,
      issue: params.issue
    }
  }).valueChanges.pluck('data', 'comic', 'issues').map(c => c[0])

  updatePage = (page) => {
    this.apollo.mutate({
      mutation: this.updateQuery,
      variables: {
        comic: this.route.snapshot.params.id,
        issue: this.route.snapshot.params.issue,
        page
      }
    }).subscribe()
  }

}
