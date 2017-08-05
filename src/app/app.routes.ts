import { Routes} from '@angular/router';
import { ComicComponent } from './comic/comic.component';
import { ComicIssueComponent } from './comic-issue/comic-issue.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComicIssueResolve } from './comic-issue-resolve';
import { ComicsReadResolve } from './comics-read-resolve';
import { ComicResolve } from './comic-resolve';
import { AuthGuard } from './auth-guard';

export const AppRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'comics', pathMatch: 'full' },
      { path: 'comics', component: HomeComponent, resolve: { comics: ComicsReadResolve } },
      { path: 'comic/:id', component: ComicComponent, resolve: { comic: ComicResolve } },
      { path: 'comic/:id/:issue', component: ComicIssueComponent, resolve: { issue: ComicIssueResolve } },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'comics' }
];
