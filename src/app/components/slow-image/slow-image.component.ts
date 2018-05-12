import { Component, Input } from '@angular/core';

@Component({
  selector: 'pou-slow-image',
  templateUrl: './slow-image.component.html',
  styleUrls: ['./slow-image.component.css']
})
export class SlowImageComponent {

  @Input() src: string;
  loading = true;

  constructor() { }

  loaded() {
    this.loading = false;
  }

}
