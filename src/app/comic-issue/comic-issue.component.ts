import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { switchMap, tap, map, pluck } from 'rxjs/operators';

@Component({
  selector: 'pou-comic-issue',
  templateUrl: './comic-issue.component.html'
})
export class ComicIssueComponent implements OnInit {
  issue$: Observable<any>;
  id: string;

  private updateQuery = gql`
  mutation ($comic: ID!, $issue: String!, $page: Int!) {
    updateIssue(_id: $comic, issue: $issue, page: $page) {
      _id
      __typename
      issues(id: $issue) {
        id
        __typename
        page
        percentage
      } 
    }
  }
  `;

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) { }

  ngOnInit() {
    this.issue$ = this.route.params.pipe(tap(({id}) => this.id = id), switchMap(this.getIssue));
  }

  private getIssue = params => this.apollo.watchQuery({
    query: gql`
    query IssueDetail($comic: ID!, $issue: String!) { 
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
  }).valueChanges.pipe(pluck('data', 'comic', 'issues'), map(c => c[0]))

  updatePage = (page) => {
    this.apollo.mutate({
      mutation: this.updateQuery,
      variables: {
        comic: this.route.snapshot.params.id,
        issue: this.route.snapshot.params.issue,
        page
      }
    }).subscribe();
  }

  goComic = () => this.router.navigate(['/comic', this.id]);

}
