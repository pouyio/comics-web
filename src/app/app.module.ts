import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';

import { AuthGuard } from './auth-guard';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';

import { ComicIssueResolve } from './comic-issue-resolve';
import { ComicsReadResolve } from './comics-read-resolve';
import { ComicResolve } from './comic-resolve';

import { AppComponent } from './app.component';
import { ComicComponent } from './comic/comic.component';
import { ComicIssueComponent } from './comic-issue/comic-issue.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { LoginComponent } from './login/login.component';

import {HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import {AppRoutes} from './app.routes';

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "auto",
    });

    // mc.get('pinch').set({enable: true});
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ComicComponent,
    ComicIssueComponent,
    SearchComponent,
    HomeComponent,
    ImageViewerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    OrderModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApiService,
    ResolveService,
    ComicResolve,
    ComicsReadResolve,
    ComicIssueResolve,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
