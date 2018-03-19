import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'pou-info',
  templateUrl: './info.component.html',
  styles: [
    `
    .big-text {
      font-size: 3.2rem;
    }
    `
  ]
})
export class InfoComponent implements OnInit {

  $info: any;
  showTotal = true;

  private infoQuery = gql`{
    info {
      genres
      writers
      publishers
      artists
      issues
      comics {
        completed
        ongoing
      }
    }
  }  
  `;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.$info = this.apollo.query({ query: this.infoQuery }).share();
  }

}
