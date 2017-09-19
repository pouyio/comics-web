import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-comic-presentation',
  templateUrl: './comic-presentation.component.html',
  styleUrls: ['./comic-presentation.component.css']
})
export class ComicPresentationComponent implements OnInit {

  @Input() comic;
  @Output() toggleWish = new EventEmitter();
  @Output() markIssueRead = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  extractInfo = (type) => {
    const info = this.filterInfo(type);

    if(info.length && info[0].attributes.name) {
      return info.map(i => i.attributes.name).join(', ');
    }

    if(info.length && info[0].attributes.first_name) {
      return info.map(i => `${i.attributes.first_name} ${i.attributes.last_name}`).join(', ');
    }

    return info.map(i => i.id).join(', ');
  }

  getIssues = (): any[] => {
    return this.filterInfo('issues').sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
  }

  getPercentagePages = (issue) => Math.round((this.comic.included.find(i => i.id === issue.id).page / this.getTotalPages(issue))* 100);

  filterInfo = (type): any[] => this.comic.included.filter(i => i.type === type);

  getTotalPages = (issue) => {
    const a = this.comic.included.find(i => i.id === issue.id).pages;
    return a ? a.length - 1 : 0.01;
  }

}
