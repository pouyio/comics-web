import { Routes} from '@angular/router';
import { ComicComponent } from './comic/comic.component';
import { ComicIssueComponent } from './comic-issue/comic-issue.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';

export const AppRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'comics', pathMatch: 'full' },
      { path: 'comics', component: HomeComponent },
      { path: 'comic/:id', component: ComicComponent },
      { path: 'comic/:id/:issue', component: ComicIssueComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'comics' }
];
