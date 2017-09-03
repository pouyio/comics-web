import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent {

  comic: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.data.subscribe(d => this.comic = d.comic);
  }

  toggleWish = () => {
    const isWish = !this.comic.wish;
    this.api.markComicWish(this.comic._id, isWish).subscribe(res => {
      if (res.ok) this.comic.wish = isWish;
    });
  }

  markIssueRead = (e) => {
    this.api.updateIssue(this.comic._id, e.issue, {read: e.val}).subscribe(res => {
      if (res.ok) {
        const ix = this.comic.included.findIndex(i => i.id === e.issue);
        this.comic.included[ix].read = e.val;
      }
    });
  }

}
