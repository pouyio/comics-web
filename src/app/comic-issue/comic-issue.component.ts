import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-comic-issue',
  templateUrl: './comic-issue.component.html',
  styleUrls: ['./comic-issue.component.css']
})
export class ComicIssueComponent implements OnInit {

  issue: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.issue = this.route.snapshot.data['issue'];
  }

  updatePage = (page) => {
    this.api.updateIssue(this.route.snapshot.params.id, this.route.snapshot.params.issue, {page}).subscribe(null);
  }

}
