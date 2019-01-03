import { Component, Input } from '@angular/core';

@Component({
  selector: 'pou-slow-image',
  templateUrl: './slow-image.component.html',
  styleUrls: ['./slow-image.component.css']
})
export class SlowImageComponent {

  @Input() src: string;
  loading = true;
  insideViewport = false;
  // private _intersectionObserver: IntersectionObserver;

  // constructor(private _element: ElementRef) { }

  // TODO strange bug in safari with IntersectionObserver, even with polyfill
  // ngAfterViewInit() {
  //   this._intersectionObserver = new IntersectionObserver(this.checkIntersection, {threshold: 0.7});
  //   this._intersectionObserver.observe(<Element>(this._element.nativeElement));
  // }


  loaded() {
    this.loading = false;
  }

  // private checkIntersection = (entries: Array<IntersectionObserverEntry>) => {
  //   entries.forEach((entry: IntersectionObserverEntry) => {
  //     if (this._checkIfIntersecting(entry)) {
  //       this.insideViewport = true;
  //       this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
  //       this._intersectionObserver.disconnect();
  //     }
  //   });
  // }

  // private _checkIfIntersecting(entry: IntersectionObserverEntry) {
  //   return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
  // }

}
