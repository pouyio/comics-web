import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  comicsRead: Array<any>;
  fullComics: Array<any>;
  issuesMap: Map<any, any>;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    [this.comicsRead, this.fullComics] = this.route.snapshot.data['comics'];
    const a: any[] = this.fullComics.map((c:any) => [c._id, c]);
    this.issuesMap = new Map(a);
  }

  toggleComicWish = (comic) => {
    const isWish = !comic.wish;
    this.api.markComicWish(comic._id, isWish).subscribe(res => {
      if(res.ok) comic.wish = isWish;
    });
  }

}
