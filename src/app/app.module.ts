import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { Interceptor } from './interceptor';

import { AuthGuard } from './auth-guard';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';


import { AppComponent } from './app.component';
import { ComicComponent } from './comic/comic.component';
import { ComicIssueComponent } from './comic-issue/comic-issue.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { LoginComponent } from './login/login.component';

import { AppRoutes } from './app.routes';
import { HomeItemComponent } from './home/home-item/home-item.component';
import { ComicPresentationComponent } from './comic/comic-presentation/comic-presentation.component';
import { IssuePresentationComponent } from './comic-issue/issue-presentation/issue-presentation.component';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { environment } from '../environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent,
    ComicComponent,
    ComicIssueComponent,
    SearchComponent,
    HomeComponent,
    ImageViewerComponent,
    LoginComponent,
    HomeItemComponent,
    ComicPresentationComponent,
    IssuePresentationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    OrderModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApiService,
    ResolveService
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: environment.api_url }),
      cache: new InMemoryCache()
    });
  }
}
