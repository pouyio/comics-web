import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pou-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  @Input() img: string;
  @Input() fullscreen: boolean;
  @Output() onSwiped = new EventEmitter<number>();
  @Output() onToggle = new EventEmitter<number>();

  swipe(e) {
    this.onSwiped.emit(e);
  }

  onClick() {
    this.onToggle.emit();
  }

  onLoaded() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
