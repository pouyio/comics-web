import { Injectable } from '@angular/core';
import { ResponseContentType} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResolveService } from './resolve.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';

@Injectable()
export class ApiService extends BaseService {

  login = (user: string): Observable<object> => {
    return this.http.post(`${this.baseUrl}/login`, {user}, {responseType: 'text'}).map(token => {
      this.auth.setToken(token);
      return {ok: 1};
    });
  }

  logout = () => this.auth.removeToken();

  getComic(id: string): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comic/${id}`)
      .do(e => this.resolver.setState(false))
      .catch(this.handleError);
  }

  getComicsRead(): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comics/read`)
      .do(e => this.resolver.setState(false))
      .catch(this.handleError);
  }

  getComicIssue(id: string, issue: string): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comic/${id}/${issue}`)
      .do(e => this.resolver.setState(false))
      .catch(this.handleError);
  }

  getNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comics/news`)
      .catch(this.handleError);
  }

  // downloadComicIssue(id: string, issue: string): Observable<any> {
  //
  //   return this.http.post(`${this.baseUrl}/comic/${id}/${issue}`,{}, {responseType : ResponseContentType.Blob}).map((res: any) => {
  //     return new Blob([res.blob()], {type: 'application/pdf'});
  //     }).catch(this.handleError);
  // }

  updateIssue(comic: string, issue: string, status: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/comic/${comic}/${issue}`, status).catch(this.handleError);
  }

  markComicWish(comic: string, wish: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/comic/${comic}`, {wish}).catch(this.handleError);
  }

  search(query: string, exact = false): Observable <any[]> {
    const params = new HttpParams().set('query', encodeURI(query));
    if(exact) params.set('exact', '1');
    return (this.http.get(`${this.baseUrl}/comics/search`, {params: params}).catch(this.handleError));
  }

  getImage(url: string) {
    return this.http.post(`${this.baseUrl}/encode`, {url: url}).catch(this.handleError);
  }

}
