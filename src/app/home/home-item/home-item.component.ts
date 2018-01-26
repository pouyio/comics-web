import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pou-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']

})
export class HomeItemComponent {

  @Input() comic;
  @Output() toggleButton = new EventEmitter();

}
