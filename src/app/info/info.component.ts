import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../api.service';

@Component({
  selector: 'pou-info',
  templateUrl: './info.component.html',
  styles: [
    `
    .big-text {
      font-size: 2.8rem;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {

  $info: any;
  showTotal = true;
  showTime = true;
  showLog = false;
  daysSinceLastUpdate: string;
  log$: Observable<{}>;

  private infoQuery = gql`{
    info {
      last_update
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

  constructor(private apollo: Apollo, private apiService: ApiService) { }

  ngOnInit() {
    this.$info = this.apollo.query({ query: this.infoQuery })
      .share()
      .do(({ data }: any) => this.setDaysSinceLastUpdate(data.info.last_update));

    this.log$ = this.apollo.query({ query: gql`{log}` }).shareReplay();
  }

  setDaysSinceLastUpdate(date) {
    const duration = (new Date().getTime() - new Date(date).getTime());
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)));

    this.daysSinceLastUpdate = days ?
      `${days} days and ${hours} hours` :
      `${hours} hours`;
  }

}
