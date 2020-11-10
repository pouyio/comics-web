import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { tap, share } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "pou-info",
  templateUrl: "./info.component.html",
  styles: [
    `
      .big-text {
        font-size: 2.8rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  $info: Observable<any>;
  showTotal = true;
  showTime = true;
  daysSinceLastUpdate: string;

  private infoQuery = gql`
    {
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

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.$info = this.apollo.query({ query: this.infoQuery }).pipe(
      share(),
      tap(({ data }: any) => this.setDaysSinceLastUpdate(data.info.last_update))
    );
  }

  setDaysSinceLastUpdate(date) {
    const duration = new Date().getTime() - new Date(date).getTime();
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    this.daysSinceLastUpdate = days
      ? `${days} days and ${hours} hours`
      : `${hours} hours`;
  }
}
