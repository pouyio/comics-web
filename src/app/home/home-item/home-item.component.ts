import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent {

  @Input() comic: any;
  @Input() comicsMap: Map<any, any>;
  @Output() toggleButton = new EventEmitter();

  constructor() { }

  getIssues = (comic) => Object.keys(comic).filter(k => k !== '_id' && k !== 'wish');

  getIssue = (comic, issue) => this.comicsMap.get(comic).included.find(i => i.id === issue);

  getPercentagePages = (comic, issue) => Math.round((comic[issue].page / this._getTotalPages(comic, issue))* 100);

  getCalendarIcon = (comicId) => {
    return this.comicsMap.get(comicId).attributes.status == 'Completed' ? 'fa-calendar-plus-o': 'fa-calendar-o';
  }

  getIssueNumber = (comicId, issue) => {
    const attr = this.getIssue(comicId, issue).attributes;
    return attr.number ? attr.number: attr.title;
  }

  private _getTotalPages = (comic, issue) => {
    const a = this.getIssue(comic._id, issue).pages;
    return a ? a.length - 1 : 0.01;
  }

}
