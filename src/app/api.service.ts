import { Injectable } from '@angular/core';
import { Http, ResponseContentType} from '@angular/http';
import { ResolveService } from './resolve.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';

@Injectable()
export class ApiService extends BaseService {

  login = (user: string): Observable<object> => {
    return this.http.post(`${this.baseUrl}/login`, {user}).map(r => {
      this.auth.setToken(r.text());
      return {ok: 1};
    });
  }

  logout = () => this.auth.removeToken();

  getComic(id: string): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comic/${id}`, this.getOptions())
      .map(res => res.json())
      .do(e => this.resolver.setState(false))
      .catch(this.handleError);
  }

  getComicsRead(): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comics/read`, this.getOptions())
      .map(r => r.json())
      .do(e => this.resolver.setState(false))
      .catch(this.handleError);
  }

  getComicIssue(id: string, issue: string): Observable<any> {
    this.resolver.setState(true);
    return this.http.get(`${this.baseUrl}/comic/${id}/${issue}`, this.getOptions())
      .map(res => res.json())
      .do(e => this.resolver.setState(false))
      .catch(this.handleError);
  }

  getNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comics/news`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  downloadComicIssue(id: string, issue: string): Observable<any> {

    return this.http.post(`${this.baseUrl}/comic/${id}/${issue}`,{}, {responseType : ResponseContentType.Blob}).map((res: any) => {
      return new Blob([res.blob()], {type: 'application/pdf'});
      }).catch(this.handleError);
  }

  markIssueRead(comic: string, issue: string, isRead: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/comic/${comic}`, { issue: issue, read: isRead }, this.getOptions()).catch(this.handleError);
  }

  markComicWish(comic: string, wish: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/comic/${comic}`, {wish}, this.getOptions()).catch(this.handleError);
  }

  search(query: string): Observable <any[]> {
    return (this.http.get(`${this.baseUrl}/comics/search/${encodeURI(query)}`, this.getOptions()).map(res => res.json()).catch(this.handleError));
  }

  getImage(url: string) {
    return this.http.post(`${this.baseUrl}/encode`, {url: url}, this.getOptions()).map(res => res.json()).catch(this.handleError);
  }

}
