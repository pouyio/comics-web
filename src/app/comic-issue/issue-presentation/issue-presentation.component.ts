import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pou-issue-presentation',
  templateUrl: './issue-presentation.component.html'
})
export class IssuePresentationComponent implements OnInit {

  @Input() issue;
  @Output() pageRead = new EventEmitter();
  page = 0;
  lastPage = 0;

  ngOnInit() {
      this.page = this.issue.page;
      this.lastPage = this.issue.pages.length - 1;
  }

  setPage = (page) => {
    this.page = page;
    this.pageRead.emit(this.page);
  }

  onPageChange = (advance) => {
    this.page += advance;
    this.setPage(this.page);
  }

  onChange = (page) => this.setPage(page);

}
