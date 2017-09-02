import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comicsRead: Array<any>;
  fullComics: Array<any>;
  issuesMap: Map<any, any>;
  comicsMap: Array<any>;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  private _map = (acc: Array<any>, comic): Array<any> => {
    acc[comic._id] = comic;
    return acc;
  }

  ngOnInit() {
    [this.comicsRead, this.fullComics] = this.route.snapshot.data['comics'];
    const a: any[] = this.fullComics.map((c:any) => [c._id, c]);
    this.issuesMap = new Map(a);
  }

  toggleComicWish = (comic) => {
    const isWish = !comic.wish;
    this.api.markComicWish(comic._id, isWish).subscribe(res => {
      if(res.ok) comic.wish = isWish;
    });
  }

  getIssues = (comic) => Object.keys(comic).filter(k => k !== '_id' && k !== 'wish');

  getPercentagePages = (comic, issue) => {
    return  Math.round((comic[issue].page / this.getTotalPages(comic, issue))* 100);
  }

  getIssue = (comic, issue) => {
    return this.issuesMap.get(comic).included.find(i => i.id === issue);
  }

  getCalendarIcon = (comicId) => {
    return this.issuesMap.get(comicId).attributes.status == 'Completed' ? 'fa-calendar-plus-o': 'fa-calendar-o';
  }

  private getTotalPages = (comic, issue) => {
    const a = this.getIssue(comic._id, issue).pages;
    return a ? a.length : 0.01;
  }

}
