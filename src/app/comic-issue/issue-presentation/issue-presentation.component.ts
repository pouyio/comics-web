import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pou-issue-presentation',
  templateUrl: './issue-presentation.component.html'
})
export class IssuePresentationComponent implements OnInit {

  @Input() issue;
  @Output() pageRead = new EventEmitter();
  @Output() onGoComic = new EventEmitter();
  page = 0;
  lastPage = 0;
  isFullscreen: boolean;

  ngOnInit() {
    this.page = this.issue.page;
    this.lastPage = this.issue.pages.length - 1;
  }

  onPageChange = (advance) => {
    this.page += advance;
    this._setPage(this.page);
  }

  onChange = (page) => this._setPage(page);

  onFullscreen = () => this.isFullscreen = !this.isFullscreen;

  private _setPage = (page) => {
    this.page = page;
    this.pageRead.emit(this.page);
  }

}
