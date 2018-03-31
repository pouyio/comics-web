import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pou-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent {

  @Input()
  source: Observable<any>;

  @Output()
  onClicked = new EventEmitter();

  onClick(writer) {
    this.onClicked.emit(writer);
  }

}
