import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService extends BaseService {

  login = (user: string): Observable<object> => {
    return this.http.post(`${this.baseUrl}/login`, {user}, {responseType: 'text'}).pipe(map(token => {
      this.auth.setToken(token);
      return {ok: 1};
    }));
  }

  logout = () => this.auth.removeToken();

  getLog = (): Observable<string> => this.http.get(`${this.baseUrl}/log`, {responseType: 'text'});

  getComic(id: string): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comic/${id}`)
      .pipe(tap(e => this.resolver.setState(false)), catchError(this.handleError));
  }

  getComicsRead(): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comics/read`)
      .pipe(tap(e => this.resolver.setState(false)), catchError(this.handleError));
  }

  getComicIssue(id: string, issue: string): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comic/${id}/${issue}`)
      .pipe(tap(e => this.resolver.setState(false)), catchError(this.handleError));
  }

  getNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comics/news`).pipe(catchError(this.handleError));
  }

  // downloadComicIssue(id: string, issue: string): Observable<any> {
  //
  //   return this.http.post(`${this.baseUrl}/comic/${id}/${issue}`,{}, {responseType : ResponseContentType.Blob}).map((res: any) => {
  //     return new Blob([res.blob()], {type: 'application/pdf'});
  //     }).catch(this.handleError);
  // }

  updateIssue(comic: string, issue: string, status: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/comic/${comic}/${issue}`, status).pipe(catchError(this.handleError));
  }

  markComicWish(comic: string, wish: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/comic/${comic}`, {wish}).pipe(catchError(this.handleError));
  }

  search(query: string, exact = false): Observable <any> {
    const params = new HttpParams().set('query', encodeURI(query));
    if (exact) params.set('exact', '1');
    return (this.http.get(`${this.baseUrl}/comics/search`, {params: params}).pipe(catchError(this.handleError)));
  }

  getImage(url: string) {
    return this.http.post(`${this.baseUrl}/encode`, {url: url}).pipe(catchError(this.handleError));
  }

}
