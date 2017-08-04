import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent {

  private comicId: String;
  comic: any;
  issues: Array<any>;
  issuesRead: Array<any>;
  genres: Array<String>;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.data.subscribe(d => {
      this.comic = d.comic
      this._curateDate(this.comic);
    });
  }

  markIssueRead(id) {
    let isRead = !this.issuesRead[id];
    this.api.markIssueRead(this.comic.data.id, id, isRead).subscribe(res => {
      if (res.ok) this.issuesRead[id] = isRead;
    });
  }

  getIssueLink(link) {
    let arr = link.split('/');
    return arr[arr.length - 1];
  }

  downloadIssue(comicId, issueId) {
    this.api.downloadComicIssue(comicId, issueId).subscribe(res => {
      FileSaver.saveAs(res, "comic.pdf");
    });
  }

  private _curateDate = (comic) => {
    this.issues = comic.included.filter(inc => inc.type === 'issues').sort((a, b) => a.links.self.localeCompare(b.links.self, undefined, { numeric: true, sensitivity: 'base' }));

    this.issuesRead = this.issues.reduce((acc, issue) => {
      let found = !!this.isRead(issue.id);
      acc[issue.id] = found;
      return acc;
    }, []);

    this.genres = comic.data.relationships.genres;
  }

  private isRead(issueId) {
    return this.comic.issuesRead.find(issue => issue === issueId);
  }

}
