import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comicsRead: Array<any>;
  fullComics: Array<any>;
  issuesMap: Array<any>;
  comicsMap: Array<any>;
  news: any;

  constructor(private route: ActivatedRoute) { }

  private _map = (acc: Array<any>, comic): Array<any> => {
    acc[comic.id] = comic;
    return acc;
  }

  ngOnInit() {
    [this.comicsRead, this.news, this.fullComics] = this.route.snapshot.data['comics'];
    this.issuesMap = this.fullComics
      .map(c => c.included)
      .reduce((a, b) => a.concat(b), [])
      .filter(c => c.type === 'issues')
      .reduce(this._map, {});

    this.comicsMap = this.fullComics
      .map(c => c.data)
      .reduce((a, b) => a.concat(b), [])
      .reduce(this._map, {});
  }

  private getIssueLink = (self) => self.split('/').splice(self.split('/').length -2).join('/');

  private getCalendarIcon = (comicId) => {
    return this.comicsMap[comicId].attributes.status == 'Completed' ? 'fa-calendar-plus-o': 'fa-calendar-o'
  }

}
