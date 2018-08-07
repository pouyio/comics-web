import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'pou-slow-image',
  templateUrl: './slow-image.component.html',
  styleUrls: ['./slow-image.component.css']
})
export class SlowImageComponent implements AfterViewInit {

  @Input() src: string;
  loading = true;
  insideViewport = false;
  private _intersectionObserver: IntersectionObserver;

  constructor(private _element: ElementRef) { }

  ngAfterViewInit() {
    this._intersectionObserver = new IntersectionObserver(this._checkForIntersection, {threshold: 0.7});
    this._intersectionObserver.observe(<Element>(this._element.nativeElement));
  }


  loaded() {
    this.loading = false;
  }

  private _checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this._checkIfIntersecting(entry)) {
        this.insideViewport = true;
        this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
        this._intersectionObserver.disconnect();
      }
    });
  }

  private _checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
  }

}
