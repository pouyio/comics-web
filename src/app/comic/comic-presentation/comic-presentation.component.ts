import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pou-comic-presentation',
  templateUrl: './comic-presentation.component.html',
  styleUrls: ['./comic-presentation.component.css']
})
export class ComicPresentationComponent implements OnChanges {

  @Input() comic;
  @Input() selectedTab;
  @Output() toggleWish = new EventEmitter();
  @Output() markIssueRead = new EventEmitter();
  @Output() selectTab = new EventEmitter();
  orderedIssues;
  zoomed = false;
  currentWidth: number = window.innerWidth;
  mobileWidth = 600;


  constructor() {
    fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth))
      .subscribe(w => {
        this.currentWidth = w;
        this.zoomed = false;
      });
  }

  ngOnChanges(changes) {
    if (!changes.comic) return;
    this.orderedIssues = this._sortIssues([...changes.comic.currentValue.issues]);
  }

  getPercentageIcon = (percentage) => {
    return percentage < 20 ?
      '🌑' : percentage < 40 ?
        '🌘' : percentage < 60 ?
          '🌗' : percentage < 80 ?
            '🌖' : percentage < 100 ?
              '🌕' : '🌑';
  }

  toggleZoomIn = () => {
    if (this.currentWidth > this.mobileWidth) {
      this.zoomed = !this.zoomed;
    }
  }

  isVisible = (tab) => {
    if (this.currentWidth > this.mobileWidth) return true;
    if (tab === this.selectedTab) return true;
  }

  private _sortIssues(issues) {
    return issues.sort((a, b) => {
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  onSelectTab(tab) {
    this.selectTab.emit(tab);
  }

}
