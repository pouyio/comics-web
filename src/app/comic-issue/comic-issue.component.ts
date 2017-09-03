import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-comic-issue',
  templateUrl: './comic-issue.component.html',
  styleUrls: ['./comic-issue.component.css']
})
export class ComicIssueComponent implements OnInit {

  issue: any;
  page: number = 0;
  lastPage: number;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.issue = this.route.snapshot.data['issue'];
    this.lastPage = this.issue.pages.length - 1;
  }

  onSwiped(e) {
    if ((this.page > 0 && e < 0) || (this.page < this.lastPage && e > 0)) {
      this.page += e;
    }
  }

}
