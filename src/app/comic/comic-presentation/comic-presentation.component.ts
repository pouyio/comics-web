import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'pou-comic-presentation',
  templateUrl: './comic-presentation.component.html',
  styleUrls: ['./comic-presentation.component.css']
})
export class ComicPresentationComponent implements OnChanges {

  @Input() comic;
  @Output() toggleWish = new EventEmitter();
  @Output() markIssueRead = new EventEmitter();
  orderedIssues;

  constructor() { }

  ngOnChanges(changes) {
    this.orderedIssues = this._sortIssues([...changes.comic.currentValue.issues]);
  }

  private _sortIssues(issues) {
    return issues.sort((a, b) => {
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

}
