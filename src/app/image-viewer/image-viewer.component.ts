import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  @Input()
  img: string;
  @Output() onSwiped = new EventEmitter<number>();
  fullScreen: boolean = false;

  constructor() { }

  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
  }

  swipe(e) {
    this.onSwiped.emit(e);
  }

  onLoaded() {
    window.scroll({top: 0, behavior: 'smooth'});
  }

}
