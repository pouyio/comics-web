import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-issue-presentation',
  templateUrl: './issue-presentation.component.html',
  styleUrls: ['./issue-presentation.component.css']
})
export class IssuePresentationComponent implements OnInit {

  @Input() issue;
  @Output() pageRead = new EventEmitter();
  @Output() onGoIssue = new EventEmitter();
  page: number = 0;
  lastPage: number = 0;

  constructor() { }

  ngOnInit() {
    if(this.issue) {
      this.page = this.issue.info.page | 0;
      this.lastPage = this.issue.pages.length - 1;
    }
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
