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

  ngOnChanges(changes) {
    this.orderedIssues = this._sortIssues([...changes.comic.currentValue.issues]);
  }

  joinComma = (list) => list.map(g => g.name).join(', ');

  getPercentageIcon = (percentage) => {
    return percentage < 20 ?
    '🌑' : percentage < 40 ?
    '🌘' : percentage < 60 ?
    '🌗' : percentage < 80 ?
    '🌖' : percentage < 100 ?
    '🌕' : '🌑';
  }

  private _sortIssues(issues) {
    return issues.sort((a, b) => {
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

}
