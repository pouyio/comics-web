import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { ResolveService } from './resolve.service';

@Injectable()
export class BaseService {

  // protected baseUrl: string = 'http://192.168.1.33:8080';
  // protected baseUrl: string = 'http://localhost:8080';
  protected baseUrl: string = 'http://ec2-52-57-163-72.eu-central-1.compute.amazonaws.com:8080';

  constructor(protected http: Http, protected auth: AuthService, protected resolver: ResolveService) {}

  protected getOptions(): RequestOptions {
      let headers: Headers = new Headers();
      headers.append('content-type', 'application/json; charset=utf-8');
      headers.append('Accept', 'application/json; charset=utf-8');
      headers.append('Authorization', this.auth.getToken());
      let opts = new RequestOptions({headers: headers});
      return opts;
  }

  protected extractData(res: Response) {
    return res.json() || { };
  }

  protected handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
