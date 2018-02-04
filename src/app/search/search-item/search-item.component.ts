import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pou-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent {

  @Input() comic;
  @Output() onToggleWish = new EventEmitter();
  @Output() goTo = new EventEmitter();

  limit(text = '', limit = 3) {
    return text.length > (limit - 3) ? text.substring(0, limit - 3).concat('...') : text;
  }

}
